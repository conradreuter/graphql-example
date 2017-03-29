import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const Article = new GraphQLObjectType({
  name: 'Article',
  description: 'An article that can be viewed and ordered.',
  fields: () => ({
    category: {
      type: new GraphQLNonNull(Category),
      description: 'The category this article belongs to.',
    },
    description: {
      type: GraphQLString,
      description: 'A text describing the details of the article.',
    },
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The ID of the article.',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the article.',
    },
    rating: {
      type: GraphQLFloat,
      description: 'The average rating of this article.',
    },
    recommendations: {
      type: new GraphQLList(Article),
      description: 'Articles recommended to buy along with this one.',
    },
    reviews: {
      type: new GraphQLList(Review),
      description: 'The reviews posted for this article.',
    },
  }),
});

const Category = new GraphQLEnumType({
  name: 'Category',
  description: 'A category that groups multiple articles.',
  values: {
    'BOOKS': {
      description: 'Physical books.',
    },
    'DEVICES': {
      description: 'Electronic devices.',
    },
  },
})

const Review = new GraphQLObjectType({
  name: 'Review',
  description: 'A review posted for an article.',
  fields: () => ({
    author: {
      type: GraphQLString,
      description: 'The author of the review.'
    },
    date: {
      type: GraphQLString,
      description: 'The ISO 8601 date when the review has been posted.',
    },
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The ID of the review.',
    },
    rating: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The rating behind this review.',
    },
    text: {
      type: GraphQLString,
      description: 'The review text.',
    },
  }),
})

const ReviewInput = new GraphQLInputObjectType({
  name: 'ReviewInput',
  description: 'The input for reviewing an article.',
  fields: () => ({
    rating: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The rating behind the review.',
    },
    text: {
      type: GraphQLString,
      description: 'The review text.',
    },
  }),
})

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'QueryRoot',
    description: 'A catalog containing articles.',
    fields: () => ({
      article: {
        type: Article,
        description: 'Finds a specific article listed in the catalog.',
        args: {
          articleId: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'The ID of the article.',
          },
        },
      },
      articles: {
        type: new GraphQLList(Article),
        description: 'Lists all available articles in the catalog.',
        args: {
          category: {
            type: Category,
            description: 'The category to list articles from. Can be omitted to not filter by category.',
          },
        },
      },
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'MutationRoot',
    description: 'The mutation root.',
    fields: () => ({
      postReview: {
        type: Article, // use Article instead of Review to ensure consistency
        description: 'Posts a new review on an article.',
        args: {
          articleId: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'The ID of the article.',
          },
          review: {
            type: new GraphQLNonNull(ReviewInput),
            description: 'The input for posting the review.',
          },
        },
      },
    }),
  })
})

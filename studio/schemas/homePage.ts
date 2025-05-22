export default {
  title: 'Home Page',
  name: 'homePage',
  type: 'document',
  fields: [
    {
      title: 'Reference Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
    },
    {
      title: 'SEO title',
      name: 'seoTitle',
      type: 'string',
    },
    {
      title: 'SEO Description',
      name: 'seoDescription',
      type: 'string',
    },
    {
      title: 'Title',
      name: 'title',
      type: 'text',
      rows: 3,
    },
    {
      title: 'Instagram Handle',
      name: 'instagramHandle',
      type: 'string',
      description: 'Enter your Instagram handle without the @ symbol',
    },
    {
      title: 'Instagram URL',
      name: 'instagramUrl',
      type: 'url',
      description: 'Full URL to your Instagram profile',
    },
    {
      title: 'Email Address',
      name: 'email',
      type: 'string',
      description: 'Contact email address',
    },
    {
      title: 'Information Snippet',
      name: 'informationSnippet',
      type: 'text',
      rows: 2,
      description: 'A short snippet of information about the business',
    },
    {
      title: 'More Information',
      name: 'moreInformation',
      type: 'text',
      rows: 4,
      description: 'General information or about text',
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
    },
  ],
}

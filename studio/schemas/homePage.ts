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
      title: 'Phone',
      name: 'phone',
      type: 'string',
    },
    {
      title: 'More Information',
      name: 'moreInformation',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          marks: {
            decorators: [],
            annotations: [
              {
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
      ],
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

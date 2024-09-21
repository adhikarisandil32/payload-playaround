import { CollectionConfig } from "payload/types"

const Posts: CollectionConfig = {
  slug: "posts",
  auth: false,
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "postDescription",
      type: "richText",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      defaultValue: ({ user }) => {
        console.log(user)

        return user
        // return user._id
      },
      admin: {
        hidden: true,
      },
    },
  ],
  access: {
    read: () => true,
  },
}

export default Posts

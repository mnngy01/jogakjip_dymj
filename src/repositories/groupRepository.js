import prisma from "../config/prisma.js";


async function save(group) {
  return await prisma.group.create({
    data: {
      name: group.name,
      password: group.password,
      imageUrl: group.imageUrl,
      isPublic: Boolean(group.isPublic),
      likeCount: 0,
      postCount: 0,
      createdAt: new Date(),
      introduction: group.introduction,
    },
  });
}


export default {
  save,
}
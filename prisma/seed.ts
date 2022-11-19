import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const createPage = await prisma.permission.upsert({
		where: { code: "CREATE_PAGE" },
		update: {},
		create: {
			code: "CREATE_PAGE",
			description: "User is able to create new pages.",
		},
	});

	const editPage = await prisma.permission.upsert({
		where: { code: "EDIT_PAGE" },
		update: {},
		create: {
			code: "EDIT_PAGE",
			description: "User is able to make changes to the existing pages.",
		},
	});

	const deletePage = await prisma.permission.upsert({
		where: { code: "DELETE_PAGE" },
		update: {},
		create: {
			code: "DELETE_PAGE",
			description: "User is able to permanently delete existing pages.",
		},
	});

	const publishArticle = await prisma.permission.upsert({
		where: { code: "PUBLISH" },
		update: {},
		create: {
			code: "PUBLISH",
			description: "User is able to publish new articles.",
		},
	});

	console.log({ createPage, editPage, deletePage, publishArticle });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

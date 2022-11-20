import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

// PERMISSION DATA
interface Permission {
	code: string;
	description?: string;
}
const permissions: Permission[] = [
	{ code: "VIEW_PAGE", description: "User is able to view any pages." },
	{ code: "CREATE_PAGE", description: "User is able to create new pages." },
	{ code: "EDIT_PAGE", description: "User is able to make changes to the existing pages." },
	{ code: "DELETE_PAGE", description: "User is able to permanently delete existing pages." },
	{ code: "PUBLISH_ARTICLE", description: "User is able to publish new articles." },
	{ code: "CREATE_CATEGORY", description: "User is able to create new article categories." },
];

// USER DATA
interface User {
	first_name: string;
	last_name: string;
}
const users: User[] = [
	{ first_name: "Jordi", last_name: "Mcdonald" },
	{ first_name: "Mikayla", last_name: "Edmonds" },
	{ first_name: "Aya", last_name: "Beltran" },
	{ first_name: "Ellie", last_name: "Lester" },
	{ first_name: "Monet", last_name: "Rubio" },
	{ first_name: "Daria", last_name: "Pena" },
	{ first_name: "Teri", last_name: "Bennett" },
	{ first_name: "Ayyub", last_name: "Miranda" },
	{ first_name: "Steffan", last_name: "Sanders" },
	{ first_name: "Luciano", last_name: "Avery" },
	{ first_name: "Amiya", last_name: "Hutchinson" },
	{ first_name: "Junayd", last_name: "Rosario" },
	{ first_name: "Albi", last_name: "Fountain" },
	{ first_name: "Samiya", last_name: "Chaney" },
	{ first_name: "Iwan", last_name: "Goff" },
	{ first_name: "Lilia", last_name: "Greene" },
	{ first_name: "Taliah", last_name: "Vu" },
	{ first_name: "Louisa", last_name: "Berg" },
	{ first_name: "Adelaide", last_name: "Nunez" },
	{ first_name: "Jad", last_name: "Harwood" },
	{ first_name: "Norma", last_name: "Jennings" },
	{ first_name: "Rhonda", last_name: "Conrad" },
	{ first_name: "Gurpreet", last_name: "Finney" },
	{ first_name: "Aniyah", last_name: "Silva" },
	{ first_name: "Fatimah", last_name: "Bartlett" },
];

const status: string[] = ["Working", "Remote", "Vacation", "Sick Leave", "OOO"];

async function createPermissions() {
	console.log("SEEDING: ❕ Creating dummy permission data for our database ❕");
	permissions.map(async (permission) => {
		await prisma.permission.upsert({
			where: { code: permission.code },
			update: {},
			create: {
				code: permission.code,
				description: permission.description,
			},
		});
	});
	console.log("SEEDING: ✅ PERMISSIONS ADDED");
}

async function createUsers() {
	console.log("SEEDING: ❕ Creating dummy user data for our database ❕");
	users.map(async (user) => {
		const username = `${user.first_name}${user.last_name}`.toLocaleLowerCase();

		await prisma.user.upsert({
			where: { username: username },
			update: {},
			create: {
				username: username,
				email: `${username}@test.com`,
				password: await hash(username, 10),
				first_name: user.first_name,
				last_name: user.last_name,
				date_of_birth: new Date(Date.now()),
				status: status[Math.floor(Math.random() * status.length)],
				user_permissions: {
					create: [
						{
							permission: {
								connect: {
									code: permissions[Math.floor(Math.random() * permissions.length)].code,
								},
							},
						},
					],
				},
			},
		});
	});

	console.log("SEEDING: ✅ USERS ADDED");
	console.log("SEEDING: ✅ USERS RANDOMLY ASSIGNED PERMISSIONS");
}

createPermissions()
	.then(async () => {
		createUsers()
			.then(async () => {
				await prisma.$disconnect();
				console.log("🎉 SEEDING SUCCESSFULLY COMPLETED 🎉");
			})
			.catch(async (e) => {
				console.error(e);
				await prisma.$disconnect();
				process.exit(1);
			});
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

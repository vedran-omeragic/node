import { Prisma, UserPermission, User as PrismaUserType } from "@prisma/client";

export interface UserOutput {
	id: number;
	username: string;
	email: string;
	first_name: string | null;
	last_name: string | null;
	date_of_birth: Date | null;
	status: string | null;
	created_at: Date;
	updated_at: Date | null;
	user_permissions: UserPermission[] | null;
}

export type UserCreateInput = Prisma.UserCreateInput;

export type User = PrismaUserType;

import PermissionRepository from "./repository";

export default class PermissionService {
	static getAllPermissions = async () => {
		const permissionList = await PermissionRepository.getAllPermissions();
		return permissionList;
	};
}

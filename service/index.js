import API from './request';
const { apiHead, apiDelete, apiGet, apiPut, apiPatch, apiPost } = API
const noLoading = (data={}) => data.unShowLoading = true;

// 登录
export const Login = (data) => apiPost('/Account/ILogin', data);

// 验证登陆
export const ILoginEncryp = () => apiPost('/Common/ILoginEncryp');

// 审批列表
export const GetToDoCount = () => apiGet('/MyTodo/ImyTodoCount');

// 左侧树
export const GetTreeInfo = () => apiPost('/Home/GetTreeInfo');

// 用户信息
export const GetUserInfo = () => apiPost('/Account/IGetUserInfo');

// 删除地块
export const ICheckedLandUsed = (data) => apiPost('/Project/ICheckLandUsed', data);

export const IGetOrganizationalUsers = (data) => apiPost('/Common/IGetOrganizationalUsers', data)

export const INewProject = (data) => apiPost('/Project/INewProject', data);

export const IProjectInfo = (data) => apiPost('/Project/IProjectInfo', data);

export const INewLand = (data) => apiPost('/Project/INewLand', data);

export const IProjectLandsInfos = (data) =>  apiPost('/Project/IProjectLandsInfo', data);

export const ILandsStatistics = (data) => apiPost('/Project/ILandsStatistics', data);

export const IsHaveXMView = (data) => apiPost('/Common/IsHaveXMView', data);

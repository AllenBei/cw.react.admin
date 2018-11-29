import CommonStore from './Common/CommonStore';
import LoginStore from './Login/LoginStore';
import ComManStore from './Company/ComManagementStore'
import ProductListStore from './Product/ProductList'
import AuthStore from './Auth/AuthStore'
import ToBeConfirmedStore from './Order/ToBeConfirmedStore';
import InStockStore from './Order/InStockStore';
import MenuConfigStore from './SysConfig/MenuConfigStore.js';
import AddressConfigStore from './SysConfig/AddressConfigStore.js';
import MemberGroupConfigStore from './SysConfig/MemberGroupConfigStore.js';
import UserConfigStore from './Account/UserConfigStore.js';
import MallVendingMacStore from './Company/MallVendingMacStore.js'
import MallManagementStore from './Company/MallManagementStore.js'

export const Common = new CommonStore();
export const LoginStores = new LoginStore();
export const ComManStores = new ComManStore();
export const AuthStores = new AuthStore();
export const ToBeConfirmedStores = new ToBeConfirmedStore();
export const MenuConfigStores = new MenuConfigStore();
export const AddressConfigStores = new AddressConfigStore();
export const MemberGroupConfigStores = new MemberGroupConfigStore();
export const UserConfigStores = new UserConfigStore();
export const ProductListStores = new ProductListStore();
export const MallVendingMacStores = new MallVendingMacStore();
export const MallManagementStores = new MallManagementStore();
export const InStockStores = new InStockStore();
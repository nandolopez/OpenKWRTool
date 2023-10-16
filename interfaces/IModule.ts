import { IModuleLang } from "./IModuleLang";

export interface IModule {
  uri: string;
  names: IModuleLang;
  icon: string;
}

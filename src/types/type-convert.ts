import { IAnyObject } from './any-object';

/**
 * 类型转换的接口定义
 * @export
 * @interface ITypeConvert
 */
export interface ITypeConvert {
  /**
   * 转换成string的接口定义
   * @returns {string}
   * @memberof ITypeConvert
   */
  toString(): string;

  /**
   * 转换成number的接口定义
   * @returns {Object}
   * @memberof ITypeConvert
   */
  valueOf(): Object;

  /**
   * 转换成Object的接口定义
   * @template R
   * @returns {R}
   * @memberof ITypeConvert
   */
  toObject(): IAnyObject;
}

// 符合graphql的分页模型的定义

import { ObjectType, Field, ClassType, Int } from 'type-graphql';
import { ITypeConvert } from './';
import { ToBase64Decorator } from '../utils/decorators/convert';

/**
 * type-graphql中定义模块类型的方法（采用一个工厂方法的形式去做）
 * @export
 * @template NodeType
 * @param {ClassType<NodeType>} TItemClass
 * @returns
 */
export function PaginationEdge<NodeType extends ITypeConvert>(
  TItemClass: ClassType<NodeType>,
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class IFPaginationEdge implements ITypeConvert {
    @Field((type) => TItemClass)
    node!: NodeType; // 数据节点的类型

    @Field((type) => String)
    @ToBase64Decorator()
    cursor!: string; // 分页的游标, 经过了base64的处理

    toObject() {
      return {
        cursor: this.cursor,
        node: this.node.toObject(),
      };
    }
  }

  return IFPaginationEdge;
}

/**
 * 分页中的page info的信息
 * @export
 * @class IFPaginationPageInfo
 */
@ObjectType()
export class IFPaginationPageInfo implements ITypeConvert {
  /**
   * 开始的游标
   * @type {string}
   * @memberof IFPaginationPageInfo
   */
  @ToBase64Decorator()
  @Field((type) => String)
  startCursor!: string;

  /**
   * 结束的游标
   * @type {string}
   * @memberof IFPaginationPageInfo
   */
  @ToBase64Decorator()
  @Field((type) => String)
  endCursor!: string;

  /**
   * 当前的游标
   * @type {string}
   * @memberof IFPaginationPageInfo
   */
  @ToBase64Decorator()
  @Field((type) => String)
  currentCursor!: string;

  /**
   * 是否有下一页
   * @type {boolean}
   * @memberof IFPaginationPageInfo
   */
  @Field((type) => Boolean)
  hasNextPage!: boolean;

  constructor() {
    this.hasNextPage = false;
    this.currentCursor = 'not-inited';
    this.endCursor = 'not-inited';
    this.startCursor = 'not-inited';
  }

  toObject() {
    return {
      startCursor: this.startCursor,
      endCursor: this.endCursor,
      currentCursor: this.currentCursor,
      hasNextPage: this.hasNextPage,
    };
  }
}

/**
 * pagination的定义
 * @export
 * @template NodeType
 * @param {ClassType<NodeType>} TItemClass
 * @returns
 */
export function PaginationResponse<NodeType = any>(
  TItemClass: ClassType<NodeType>,
) {
  @ObjectType({ isAbstract: true })
  abstract class IFPagination {
    constructor() {
      this.totalCount = 0;
      this.pageInfo = new IFPaginationPageInfo();
      this.edges = [];
    }
    /**
     * 总数
     * @type {number}
     * @memberof IFPagination
     */
    @Field((type) => Int)
    totalCount!: number;

    /**
     * 边的信息（这个类型是一个模版，需要运行时指定）
     * @type {NodeType[]}
     * @memberof IFPagination
     */
    @Field((type) => [TItemClass])
    edges!: NodeType[];

    /**
     * 页面信息
     * @type {IFPaginationPageInfo}
     * @memberof IFPagination
     */
    @Field((type) => IFPaginationPageInfo)
    pageInfo!: IFPaginationPageInfo;
  }

  return IFPagination;
}
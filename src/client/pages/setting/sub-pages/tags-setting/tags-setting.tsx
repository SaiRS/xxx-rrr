import * as React from 'react';
import ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { tagsQueryRequest } from '@cutils/request/rrr';
import { CLogger } from '@cutils';
import classNames from 'classnames';

import { Modal, Form, Tree, Input, Button } from 'antd';

import { Formik } from 'formik';
import * as yup from 'yup';
import { tagsAddRequest } from '@cutils/request/rrr/tags/tags-add';
import { ITag, getDisplayName, getDemensionPath } from '@root/src/types';
import { ITreeNode, generateTreeNode } from '@root/src/types/rrr/tree-node';

const schema = yup.object({
  name: yup.string().required(),
  color: yup.string(),
});

function convertTagListToTagNodes(tags: ITag[]): ITreeNode<ITag | null>[] {
  let dirMap: { [key: string]: ITreeNode<ITag | null> } = {};

  let result: ITreeNode<ITag | null>[] = [];
  for (let tag of tags) {
    // 路径
    let demension = getDemensionPath(tag);

    // 名字
    let name = getDisplayName(tag);

    if (!demension) {
      let node = generateTreeNode(name, tag);
      result.push(node);
    } else {
      let node = generateTreeNode(name, tag);

      let demensionSegments = demension.split('/');

      let index = 0;
      let parent = null;
      while (index < demension.length) {
        let path = demensionSegments.slice(0, index + 1).join('/');

        let parentNode = dirMap[path];
        if (parentNode) {
          if (index === demension.length - 1) {
            parentNode.children.push(node);
          }

          parent = parentNode;
        } else {
          let ppNode = generateTreeNode(path, null);
          if (index === demension.length - 1) {
            ppNode.children.push(node);
          }

          dirMap[path] = ppNode;
          // // 没有找到
          if (!parent) {
            result.push(ppNode);
          }

          parent = ppNode;
        }

        index++;
      }
    }
  }

  return result;
}

export default function TagsSettingPage(
  props: RouteComponentProps,
): React.ReactElement {
  const [tags, setTags] = React.useState<ITag[]>([]);
  const [showCreateModel, setShowCreateModel] = React.useState<boolean>(false);
  const container = React.useRef<HTMLDivElement>(document.createElement('div'));

  const [tagNodes, setTagNodes] = React.useState<ITreeNode<ITag>[]>([]);

  React.useEffect(() => {
    let domContainer = container.current;
    document.body.appendChild(domContainer);

    return () => {
      domContainer.remove();
    };
  }, []);

  React.useEffect(() => {
    tagsQueryRequest()
      .then((result) => {
        CLogger.info(result);
      })
      .catch((error: Error) => {
        CLogger.error(error);
      });
  }, []);

  React.useEffect(() => {
    // 构造树状结构数据
    setTagNodes(convertTagListToTagNodes(tags));
  }, [tags]);

  function onNew() {
    setShowCreateModel(true);
  }

  function onHandleClose() {
    setShowCreateModel(false);
  }

  function onHandleOk(values: any) {
    console.log('----------', values);
    tagsAddRequest(values)
      .then((result) => {
        CLogger.info(result);
      })
      .catch((error: Error) => {
        CLogger.error(error);
      });
  }

  return (
    <div className={classNames('w-full h-full')}>
      <button
        className={classNames(
          'bg-blue-500 rounded-lg px-4 py-2 text-white shadow',
        )}
        onClick={onNew}
      >
        新增
      </button>
      <Tree defaultExpandAll={true}>
        {tagNodes.map((node: ITreeNode<ITag>) => {
          return (
            <Tree.TreeNode key={node.uuid} title={getDisplayName(node.value)}>
              <div style={{ backgroundColor: node.value.color }}></div>
            </Tree.TreeNode>
          );
        })}
      </Tree>
      {ReactDOM.createPortal(
        <Modal
          visible={showCreateModel}
          onCancel={onHandleClose}
          title={'新增标签'}
        >
          <Formik
            validationSchema={schema}
            onSubmit={onHandleOk}
            initialValues={{
              name: '',
              groupName: '输入输出',
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Item label="标签名字">
                  <Input></Input>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  确定
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>,
        container.current,
      )}
    </div>
  );
}

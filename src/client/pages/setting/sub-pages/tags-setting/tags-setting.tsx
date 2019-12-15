import * as React from 'react';
import ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { tagsQueryRequest } from '@cutils/request/rrr';
import { CLogger } from '@cutils';
import classNames from 'classnames';

import { Table, Modal, Button, Form } from 'react-bootstrap';
import { ITag } from '@server/database';

import { Formik } from 'formik';
import * as yup from 'yup';
import { tagsAddRequest } from '@cutils/request/rrr/tags/tags-add';

const schema = yup.object({
  name: yup.string().required(),
  groupName: yup.string().required(),
});

export default function TagsSettingPage(
  props: RouteComponentProps,
): React.ReactElement {
  const [tags, setTags] = React.useState<ITag[]>([]);
  const [showCreateModel, setShowCreateModel] = React.useState<boolean>(false);
  const container = React.useRef<HTMLDivElement>(document.createElement('div'));

  React.useEffect(() => {
    let domContainer = container.current;
    document.body.appendChild(domContainer);

    return () => {
      console.log('-----------======------');
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
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>名字</th>
            <th>维度</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag: ITag, index: number) => {
            return (
              <tr key={tag.id}>
                <td>{index}</td>
                <td>{tag.name}</td>
                <td>{tag.groupName}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {ReactDOM.createPortal(
        <Modal show={showCreateModel} onHide={onHandleClose}>
          <Modal.Header closeButton>
            <Modal.Title>新增标签</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>名字</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="标签名字"
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>维度</Form.Label>
                    <Form.Control
                      as="select"
                      name="groupName"
                      onChange={handleChange}
                      value={values.groupName}
                      isInvalid={!!errors.groupName}
                    >
                      <option>输入输出</option>
                      <option>目的</option>
                      <option>做事步骤</option>
                      <option>计划</option>
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    确定
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>,
        container.current,
      )}
    </div>
  );
}

import * as React from 'react';
import { usePost } from 'src/hooks';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import state from 'src/recoil';

type Params = {
  name: string;
  message: string;
};

const Post = () => {
  const { post, uploadImage } = usePost();
  const [uname, setUname] = useRecoilState(state.uname);

  const { register, getValues, setValue, handleSubmit } = useForm<Params>({
    mode: 'onChange',
    defaultValues: { name: uname, message: '' },
  });

  const onSubmit = (data: Params) => {
    setUname(data.name);
    const _message = data.message;
    setValue('message', '');

    post({ name: data.name, message: _message });
  };

  const postMesseage = (keyEvent: React.KeyboardEvent<HTMLFormElement>) => {
    if (getValues('message').length === 0 && keyEvent.key === 'Enter') {
      document.getElementById('textarea')?.blur();
      return;
    }

    const submitButton = document.getElementById('submit')
      ? document.getElementById('submit')
      : null;
    if (submitButton && getValues('message') && keyEvent.key === 'Enter') {
      submitButton.click();
    }
  };

  return (
    <>
      <label>
        <span className="btn btn-info">
          画像アップロード
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={e => {
              getValues('name').length !== 0
                ? uploadImage(e, getValues('name'))
                : uploadImage(e, '名無し');
            }}
          />
        </span>
      </label>

      <hr />

      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={e => postMesseage(e)}>
        <div className="form-group text-center">
          <input
            name="name"
            ref={register({
              required: '必須項目です',
              maxLength: {
                value: 15,
                message: '15文字以内で入力してください',
              },
            })}
            required
            maxLength={15}
            placeholder="ハンネ"
            size={30}
          />
        </div>

        <div className="form-group">
          <textarea
            id="textarea"
            className="form-control"
            style={{ maxWidth: 400, margin: '0 auto' }}
            name="message"
            ref={register({
              required: '必須項目です',
              maxLength: {
                value: 150,
                message: '150文字以内で入力してください',
              },
            })}
            placeholder="メッセージ 150文字以内"
            required
            maxLength={150}
            rows={3}
          ></textarea>

          <div className="text-center">
            <input
              type="submit"
              value="投稿"
              className="btn btn-primary"
              id="submit"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default Post;

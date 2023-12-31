import axios from 'axios';
import {useState} from 'react';

export default function useRequest({
  url,
  method,
  body,
  onSuccess,
  }) {
  // method must be valid method string
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null)
      const res = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(res.data)
      };
      return res.data;

    } catch (err) {
      setErrors(
        <div className='alert alert-danger'>
          <h4>Oooops...</h4>
          <ul className='my-0'>
            {err.response.data.errors.map(err => (
              <li key={err.message}>
                {err.message}
              </li>
            ))}
          </ul>
        </div>
      )
    };
  };
  return { doRequest, errors };
};

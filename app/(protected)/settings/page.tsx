'use client';

import InputField from 'components/InputField';
import SettingsButton from 'components/shared/buttons/SettingsButton';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'

type Icon = 'pencil' | 'check';

function Settings() {
  const [usernameEdit, setUsernameEdit] = useState<Icon>('pencil');
  const [passwordEdit, setPasswordEdit] = useState<Icon>('pencil');

  async function getUsername(userID) {
    try {
      const response = await axios.get(`/api/getUsername`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  getUsername("fdsf")

  return (
    <div className="bg-yellow-light">
      <h2 className="title-bold">User Settings</h2>
      <div className="mt-[60px] flex">
        <div className="flex gap-4">
          <InputField
            label={'Username'}
            showLabel={true}
            type={'username'}
            width={'reduced'}
            disabled={usernameEdit === 'pencil'}
            placeholder="<current username>"
          />
          <SettingsButton
            disabled={false}
            variant={usernameEdit}
            children=""
            onClick={() => {
              setUsernameEdit(usernameEdit === 'pencil' ? 'check' : 'pencil');
            }}
          />
        </div>
      </div>
      <div className="my-4">
        <div className="flex gap-4">
          <InputField
            label={'Password'}
            showLabel={true}
            type={'password'}
            width={'reduced'}
            disabled={passwordEdit === 'pencil'}
            placeholder="<current password>"
          />
          <SettingsButton
            disabled={false}
            variant={passwordEdit}
            children=""
            onClick={() => {
              setPasswordEdit(passwordEdit === 'pencil' ? 'check' : 'pencil');
            }}
          />
        </div>
      </div>
      <div className="mb-[107px]">
        <div className="flex gap-4 items-">
          <InputField
            label={'Confirm Password'}
            showLabel={true}
            type={'password'}
            width={'reduced'}
            disabled={passwordEdit === 'pencil'}
            placeholder="<password>"
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;

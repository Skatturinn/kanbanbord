import React, { useState } from 'react';

type Profile = {
  username: string;
  password: string;
  avatar: string;
  group_id: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<Profile>({
    username: '',
    password: '',
    avatar: '',
    group_id: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${localStorage.getItem('userId')}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={profile.username} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={profile.password} onChange={handleChange} />
      </label>
      <label>
        Avatar URL:
        <input type="text" name="avatar" value={profile.avatar} onChange={handleChange} />
      </label>
      <label>
        Group ID:
        <input type="text" name="groupId" value={profile.group_id} onChange={handleChange} />
      </label>
      <button type="submit">Update Profile</button>
    </form>
  );
}
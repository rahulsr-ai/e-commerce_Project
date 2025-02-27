

import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="w-full animate-pulse space-y-4">
      <div className="h-32 w-32 rounded-full bg-zinc-800 mx-auto" />
      <div className="space-y-2">
        <div className="h-4 bg-zinc-800 rounded w-48 mx-auto" />
        <div className="h-4 bg-zinc-800 rounded w-32 mx-auto" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
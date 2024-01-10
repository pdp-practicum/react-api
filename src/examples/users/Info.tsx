import React from 'react';

interface InfoProps {
  userId: number;
}

const Info: React.FC<InfoProps> = (props) => {

  const { userId } = props;

  console.log(userId);
  return (
    <div>

      User ID: {userId}

    </div>
  );
};

export default Info;

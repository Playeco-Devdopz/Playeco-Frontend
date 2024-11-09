export type User = {
  bgmiId: string;
  bio: string;

  email: string;
  image?: string;
  name: string;
  uid: string;
  followers: string[];
  videos: [];

  upiId: string;
  _id: string;
};

export type VideoProps = {
  createdAt: string;
  description: string;
  hashtag: string;
  title: string;
  likes: string[];
  comments: COMMENT[];
  userId: User;
  thumbnail: string;
  userName: string;
  video: string;
  _id: string;
};


export type COMMENT = {
  text: string;
  updatedAt: string;
  userId: User;
};

export type PostVideoParams = {
  videoDetails: {};
  userId: string;
  userName: string;
};

export type getUserVideoPara = {
  userId: string;
};

export type deleteVideoPara = {
  userId: string;
  videoId: string;
};

export type FILTERVIDEO = {
  _id: string;
};

export type AddComment = {
  text: string;
  videoId: string;
  userId: string;
  videoUserId: string;
};

export type DeleteVideo = {
  id: string;
  videoId: string;
};



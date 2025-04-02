interface User {
  id: string;
  name: string;
  city: string;
  country: string;
  birthdate: string;
  gender: string;
  occupation: string;
}

export const users = new Map<string, Omit<User, "id">>([
  [
    "1",
    {
      name: "John Doe",
      city: "New York",
      country: "USA",
      birthdate: "1990-01-01",
      gender: "man",
      occupation: "Software Engineer",
    },
  ],
  [
    "2",
    {
      name: "Jane Smith",
      city: "Los Angeles",
      country: "USA",
      birthdate: "1992-02-02",
      gender: "woman",
      occupation: "Data Scientist",
    },
  ],
  [
    "3",
    {
      name: "Alice Johnson",
      city: "Chicago",
      country: "USA",
      birthdate: "1988-03-03",
      gender: "woman",
      occupation: "UX Designer",
    },
  ],
  [
    "4",
    {
      name: "Bob Brown",
      city: "Houston",
      country: "USA",
      birthdate: "1985-04-04",
      gender: "man",
      occupation: "Product Manager",
    },
  ],
]);

export const postsByUserId = new Map<string, string[]>([
  ["1", ["1", "2"]],
  ["2", ["3", "4"]],
  ["3", ["5", "6"]],
]);

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  userName: string;
}

export const posts = new Map<string, Pick<Post, "title" | "content">>([
  ["1", { title: "Post 1", content: "This is the content of Post 1" }],
  ["2", { title: "Post 2", content: "This is the content of Post 2" }],
  ["3", { title: "Post 3", content: "This is the content of Post 3" }],
  ["4", { title: "Post 4", content: "This is the content of Post 4" }],
  ["5", { title: "Post 5", content: "This is the content of Post 5" }],
  ["6", { title: "Post 6", content: "This is the content of Post 6" }],
]);

export const friendsByUserId = new Map<string, string[]>([
  ["1", ["2"]],
  ["2", ["1", "3"]],
]);

export const getUserData = (id: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.get(id);
      if (!user) {
        reject(new Error("User not found"));
      } else {
        resolve({ ...user, id });
      }
    }, 3000);
  });
};

export const getFeedData = (id: string): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userFriends = friendsByUserId.get(id);
      if (!userFriends || userFriends.length === 0) {
        return resolve([]);
      }
      const result: Post[] = [];
      const friendList = new Set(userFriends);
      let index = 0;
      while (result.length < 3 && friendList.size > 0) {
        for (const friend of friendList) {
          const postsByFriend = postsByUserId.get(friend);
          if (!postsByFriend) {
            friendList.delete(friend);
            continue;
          }
          const post = postsByFriend.at(index);
          if (!post) {
            friendList.delete(friend);
            continue;
          }
          const postData = posts.get(post);
          if (!postData) {
            friendList.delete(friend);
            continue;
          }
          const userData = users.get(friend);
          if (!userData) {
            friendList.delete(friend);
            continue;
          }
          result.push({
            ...postData,
            id: post,
            userId: friend,
            userName: userData.name,
          });
        }
        index++;
      }
      resolve(result);
    }, 3000);
  });
};

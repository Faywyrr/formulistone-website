const FOLDER_ID = process.env.GD_FOLDER_ID;
const API_KEY = process.env.GD_API_KEY;
const API_URL = "https://www.googleapis.com/drive/v3/files";
const FIELDS = encodeURI(
  "files(id, name, createdTime, webContentLink, thumbnailLink, imageMediaMetadata)",
);

export type Image = {
  id: string;
  name: string;
  createdTime: string;
  webContentLink: string;
  thumbnailLink: string;
  imageMediaMetadata: {
    width: number;
    height: number;
    rotation: number;
  };
};

export async function listImages() {
  const query = encodeURI(`'${FOLDER_ID}' in parents`);
  const url = `${API_URL}?key=${API_KEY}&q=${query}&fields=${FIELDS}`;

  return fetch(url, { next: { revalidate: 3600 } })
    .then((res) => res.json())
    .then((data) => {
      const files = data.files as Image[];
      return files.sort((a, b) => {
        return (
          new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
        );
      });
    });
}

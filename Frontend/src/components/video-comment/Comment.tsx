import { COMMENT } from "../../types/Types";

type commentProps = {
  data: COMMENT;
};

// Define a list of color classes
const colorClasses = [
  "text-red-500",
  "text-blue-500",
  "text-green-500",
  "text-yellow-500",
  "text-pink-500",
  "text-indigo-500",
  "text-purple-500",
  // Add more colors as needed
];

// Function to get the color class for a given account name
const getColorForAccount = (accountName: string): string => {
  // Generate a hash based on the account name to get a consistent color
  let hash = 0;
  for (let i = 0; i < accountName.length; i++) {
    hash = accountName.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Use the hash to pick a color from the list
  const colorIndex = Math.abs(hash) % colorClasses.length;
  return colorClasses[colorIndex];
};

const Comment: React.FC<commentProps> = ({ data }) => {
  const accountName = data?.userId?.name || "unknown";

  return (
    <div className="flex flex-row items-center mb-4 mt-4">
      <div className="flex flex-col">
        <div className="flex items-center w-[100%] gap-2 mr-5 text-[13px] font-[700]">
          <p className={`${getColorForAccount(accountName)}`}>
            <span>{accountName}</span> 
            <span className="text-white text-[14px] font-[400]"> {data?.text}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;

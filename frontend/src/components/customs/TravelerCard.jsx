/* eslint-disable react/prop-types */
const TravelerCard = ({ formData, item, handlechange }) => {
  return (
    <div
      className={`border border-gray-100 px-5 py-4 md:px-10 rounded-md shadow-md hover:shadow-2xl cursor-pointer w-[100%] ${
        formData?.traveler === item.people && "bg-gray-100"
      }`}
      onClick={() => handlechange("traveler", item.people)}
    >
      <h2 className="text-4xl flex justify-center pb-4">{item.icon}</h2>
      <h2 className="font-bold text-lg flex justify-center">{item.title}</h2>
      <h2 className="text-sm text-gray-500 flex justify-center">{item.desc}</h2>
    </div>
  );
};

export default TravelerCard;

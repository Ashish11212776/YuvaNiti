import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filledForms,
  recommendedForm,
  savedForms,
} from "../../features/accountThunk";

const DashBoard = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.profile.data.userDetails);
  const FilledForms = useSelector((state) => state?.account?.FilledForms?.data);
  console.log(FilledForms);

  const SavedForms = useSelector((state) => state?.account?.SavedForms?.data);

  const RecommendData = useSelector(
    (state) => state?.account?.RecommendedForm?.data
  );

  useEffect(() => {
    dispatch(filledForms({ userId: id }));
    dispatch(savedForms({ userId: id }));
    dispatch(recommendedForm({ userId: id }));
  }, []);

  return (
    <div className="p-8">
      <div className="flex flex-wrap gap-8 justify-center">
        <div className="bg-blue-100 shadow-lg p-6 rounded-2xl w-64 text-center border border-gray-200 transition-transform transform hover:scale-105 duration-300">
          <p className="text-4xl font-extrabold text-blue-500">
            {SavedForms?.totalItems ?? 0}
          </p>
          <h2 className="text-lg font-semibold text-gray-700">Saved Forms</h2>
        </div>

        <div className="bg-green-100 shadow-lg p-6 rounded-2xl w-64 text-center border border-gray-200 transition-transform transform hover:scale-105 duration-300">
          <p className="text-4xl font-extrabold text-green-500">
            {RecommendData?.totalItems ?? 0}
          </p>
          <h2 className="text-lg font-semibold text-gray-700">
            Recommended Forms
          </h2>
        </div>

        <div className="bg-purple-100 shadow-lg p-6 rounded-2xl w-64 text-center border border-gray-200 transition-transform transform hover:scale-105 duration-300">
          <p className="text-4xl font-extrabold text-purple-500">
            {FilledForms?.totalItems ?? 0}
          </p>
          <h2 className="text-lg font-semibold text-gray-700">Filled Forms</h2>
        </div>
      </div>

      <div className="mt-8 space-y-6 text-center">
        <div>
          <h3 className="text-xl font-semibold">Saved Forms</h3>
          {SavedForms?.totalItems === 0 && (
            <p className="text-red-500 font-medium italic">No data available</p>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold">Filled Forms</h3>
          {FilledForms?.totalItems === 0 && (
            <p className="text-red-500 font-medium italic">No data available</p>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold">Recommended Forms</h3>
          {RecommendData?.totalItems === 0 && (
            <p className="text-red-500 font-medium italic">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

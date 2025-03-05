import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../../features/dataThunks";
import loa from "../../../assets/loo.gif";
import giff from "../../../assets/lo.gif";
import StatusReject from "./StatusReject";

const Home = () => {
  const dispatch = useDispatch();

  const { data, error, loading, status } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getAllData());
  }, []);

  return (
    <>
      {status ? (
        <div className="min-h-screen bg-gray-100 py-6">
          <div
            className="min-h-[30px] w-[50%] bg-slate-200 flex justify-center items-center rounded-xl shadow-md 
              mx-auto mt-10 mb-8"
          >
            <h1 className="text-black text-2xl font-bold">SERVICES</h1>
          </div>

          <br />
          <div className="container mx-auto px-4">
            {/* Error Handling */}
            {error ? (
              <div className="text-red-600 text-center text-xl">
                Something Went Wrong!!
              </div>
            ) : loading ? ( // Handle loading state
              <div className="mt-20 text-center">
                <center>
                  <img src={loa} alt="Loading" className="bg-white" />
                </center>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg overflow-hidden p-4"
                  >
                    {/* Title Section */}
                    <div className="text-center mb-6">
                      <h1 className="text-3xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                        {item?.name}
                      </h1>
                      <p className="text-lg text-gray-600 mt-2">
                        {item?.long_description}
                      </p>
                      <hr className="my-4 border-gray-300" />
                    </div>

                    {/* Check if products exist */}
                    {item?.products && item?.products?.length > 0 ? (
                      item.products
                        .slice(0, 4)
                        ?.map((product, productIndex) => (
                          <div
                            key={productIndex}
                            className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-2xl hover:bg-gray-50 transition-all"
                          >
                            <p className="text-xl font-semibold text-gray-700 hover:text-blue-500">
                              {product?.display_template}
                            </p>
                          </div>
                        ))
                    ) : (
                      <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-2xl hover:bg-gray-50 transition-all">
                        <center>
                          <img src={giff} alt="Loading" className="w-16 h-16" />
                        </center>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <StatusReject />
      )}
    </>
  );
};

export default Home;

import {useEffect, useState } from "react";
import { useSelector } from "react-redux";
import loo from "../../../assets/loo.gif";
import govimg from "../../../assets/govimg.png"
import {formatDate} from "../../utils/generateCaptcha"



const AdvertismentBoard = () => {
  const { advertismentData, loading } = useSelector((state) => state?.advertismentData);
  const { advertisements } = advertismentData?.data || {};
  const [selectedAd, setSelectedAd] = useState(null); // Track selected advertisement

 


  return (
    <>
      {loading ? (
        <div className="mt-36 text-center">
          <center>
            <img src={loo} alt="Loading" />
          </center>
        </div>
      ) : (
        <div className="mainContainer flex gap-4 p-6 h-screen">
          {/* Left Section - List of Advertisements (Sticky) */}
          <div className="leftmain w-1/3 border-r border-gray-300 p-4 h-full sticky top-0 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Advertisements</h2>
            {advertisements?.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md mt-4 cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelectedAd(item)}
              >
                {/*  img Logo */}
                <div className="flex items-center gap-3">
                  <img src={govimg} alt=""  className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="text-gray-600">
                  {formatDate(item.notification_start_date)} - {formatDate(item.notification_end_date)}
                </p>
                <p className="text-gray-500">{item.notifying_authority}</p>
                <p className="text-gray-500">{item.number}</p>
              </div>
            ))}
          </div>

          {/* Right Section - Detailed Info (Scrollable) */}
          <div className="rightmain w-2/3 p-4 overflow-y-auto h-screen">
            {selectedAd ? (
              <div className="p-6 border rounded-lg shadow-md">
                <h2 className="text-2xl font-bold">{selectedAd.title}</h2>
                <p className="mt-2 text-gray-600">
                  Issued by <strong>{selectedAd.notifying_authority}</strong>
                </p>
                <p className="mt-2 text-gray-500">
                  Advertisement Number: <strong>{selectedAd.number}</strong>
                </p>
                <p className="mt-2 text-gray-600">
                  Notification Date:{" "}
                  <strong>
                    {formatDate(selectedAd.notification_start_date)} - {formatDate(selectedAd.notification_end_date)}
                  </strong>
                </p>

                {/* Mapping through the product array */}
                {selectedAd.products?.map((prod, idx) => (
                  <div key={idx} className="mt-6 p-4 border rounded-md bg-gray-100 shadow">
                    <h3 className="text-lg font-semibold">Product Details</h3>
                    <p><strong>Active:</strong> {prod.active ? "Yes" : "No"}</p>
                    <p><strong>Start Date:</strong> {prod.active_start_date}</p>
                    <p><strong>End Date:</strong> {prod.active_end_date}</p>
                    <p><strong>Age Limit:</strong> {prod.age_limit}</p>
                    <p><strong>Number of Posts:</strong> {prod.number_of_posts}</p>
                    <p><strong>Total Vacancies:</strong> {prod.total_vacancies_in_product}</p>
                    <p><strong>Fee:</strong> ₹{prod.fee}</p>
                    <p><strong>Go Live Date:</strong> {prod.go_live_date}</p>
                    <p><strong>Last Date to Pay Fee:</strong> {prod.last_date_to_pay_fee}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Click on an advertisement to view details.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdvertismentBoard;

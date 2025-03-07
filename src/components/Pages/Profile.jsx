import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../features/accountThunk";
import { toast, ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { FaMobileAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { getProfile } from "../../features/authThunk";

const Profile = () => {
  const profileData = useSelector((state) => state?.auth?.userData);
 
  
  

  const { id } = useSelector(
    (state) => state?.auth?.profile?.data?.userDetails
  );

  const isOtherOrStateCategory = profileData?.isOtherOrStateCategory || false;

  const userId = id;
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    fathersName: "",
    mothersName: "",
    adharNumber: 0,
    dob: "",
    religion: "Hindu",
    gender: "Male",
    category: "GEN",
    isOtherOrStateCategory: false,
    otherOrStateCategory: "",
    categoryIssueDate: "",
    categoryValidUpto: "",
    otherCategoryDateOfIssue: "",
    otherCategoryValidUpto: "",
    belongsToMinority: false,
    domicile: false,
    disability: false,
    exService: false,
    isMarried: false,
    identificationMark1: "",
    identificationMark2: "",
    subcategory: "",
  });

  useEffect(() => {
    if (profileData) {
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const [yyyy, mm, dd] = dateString.split("-");
        return `${dd}-${mm}-${yyyy}`;
      };

      setFormValues({
        ...formValues,
        firstName: profileData?.firstName || "",
        lastName: profileData?.lastName || "",
        fathersName: profileData?.fathersName || "",
        mothersName: profileData?.mothersName || "",
        adharNumber: profileData?.adharNumber || "",
        dob: profileData?.dob || "",
        religion: profileData?.religion || "Hindu",
        gender: profileData?.gender || "Male",
        category: profileData?.category || "GEN",
        isOtherOrStateCategory,
        otherOrStateCategory: profileData?.otherOrStateCategory || "",
        categoryIssueDate: formatDate(profileData?.categoryIssueDate),
        categoryValidUpto: formatDate(profileData?.categoryValidUpto),
        otherCategoryDateOfIssue: isOtherOrStateCategory
          ? formatDate(profileData?.otherCategoryDateOfIssue)
          : "",
        otherCategoryValidUpto: isOtherOrStateCategory
          ? formatDate(profileData?.otherCategoryValidUpto)
          : "",
        belongsToMinority: profileData?.belongsToMinority || false,
        domicile: profileData?.domicile || false,
        disability: profileData?.disability || false,
        exService: profileData?.exService || false,
        isMarried: profileData?.isMarried || false,
        identificationMark1: profileData?.visible_identification_mark_1 || "",
        identificationMark2: profileData?.visible_identification_mark_2 || "",
        subcategory: profileData?.subcategory || "",
      });
    }
  }, [profileData]);

  const patterns = {
    firstName: /^[a-zA-Z\s]{1,50}$/,
    lastName: /^[a-zA-Z\s]{1,50}$/,
    fathersName: /^[a-zA-Z\s]{1,50}$/,
    mothersName: /^[a-zA-Z\s]{1,50}$/,
  };
  const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;

  const blurValidation = (e) => {
    const { name, value } = e.target;
    if (value && !dateRegex.test(value)) {
      setErrors({ ...errors, [name]: "Invalid date format! Use DD-MM-YYYY" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (patterns[name]) {
      if (value === "" || patterns[name].test(value)) {
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      } else {
        console.warn(`Invalid input for ${name}: ${value}`);
      }
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value.trim(),
      }));
    }
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value === "YES",
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formValues,
    };

    dispatch(updateUserDetails({ data, userId }))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(getProfile({ userId })).then(() => window.location.reload());
          toast.success("profile update");
        } else {
          toast.error(res?.payload?.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      });
  };
  return (
    <div className="container-main flex w-full ">
      {" "}
      {/* {left div} */}
      <div className="flex flex-row gap-4 mx-auto max-w-[17%] ml-0">
        <div className="w-full bg-gray-500 text-white overflow-hidden h-screen sticky top-0">
          <div className="p-4 bg-gray-600 text-center">
            <h2 className="text-xl font-semibold mb-2">
              {profileData?.fullName}
            </h2>
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-white rounded-full flex justify-center items-center">
                <div className="text-blue-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="5"></circle>
                    <path d="M20 21a8 8 0 0 0-16 0"></path>
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-sm mt-2">
              (Upload recent photograph with plain white background)
            </p>
          </div>

          <div className="p-4 border-t border-gray-600">
            <h3 className="text-lg font-medium">Personal Details</h3>
          </div>

          <div className="p-4 border-t border-gray-600">
            <h3 className="text-lg font-medium">Contact Details</h3>
          </div>

          <div className="p-4 border-t border-gray-600">
            <h3 className="text-lg font-medium">Qualification Details</h3>
          </div>

          <div className="p-4 border-t border-gray-600">
            <h3 className="text-lg font-medium">Physical Details</h3>
          </div>
        </div>
      </div>
      {/* {right div} */}
      <div className="w-[72%] mx-auto p-8 bg-gradient-to-b from-white-50 to-white rounded-lg shadow-lg border border-white-100 m-2">
        <div className=" bg-[#c5cbd8] shadow-lg rounded-2xl p-4 h-[40px] w-[80%] ml-[10%] flex items-center justify-between mb-4">
          <p className="text-lg font-semibold ">{profileData?.fullName}</p>

          <div className="flex items-center gap-2 text-gray-600">
            <FaMobileAlt />
            <span>{profileData?.mobileNumber}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <FaUser />
            <span>{profileData?.gender}</span>
          </div>
        </div>
        <div className=" h-1"></div>

        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-semibold text-gray-600 mb-8 pb-2 border-b-2 border-gray-300">
            Personal Information
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Fields - Row 1 */}
            <div>
              <label className="block text-blue-800 font-medium mb-1">
                First Name <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Name"
                className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100"
                value={formValues.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Last Name <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formValues.lastName}
                className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100"
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Parents Names - Row 2 */}
            <div>
              <label className="block text-blue-800 font-medium mb-1">
                {"Father's Name"}{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="fathersName"
                placeholder="FName"
                value={formValues.fathersName}
                onChange={handleInputChange}
                className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100"
                required
              />
            </div>

            <div>
              <label className="block text-blue-800 font-medium mb-1">
                {" Mother's Name"}{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="mothersName"
                placeholder="MName"
                value={formValues.mothersName}
                onChange={handleInputChange}
                className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100"
                required
              />
            </div>

            {/* ID and DOB - Row 3 */}
            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Aadhaar Number <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="number"
                name="adharNumber"
                placeholder="Aadhaar number"
                value={formValues.adharNumber}
                onChange={handleInputChange}
                className="p-3 w-full border border-gray-300 rounded-md shadow-sm  focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-blue-800 font-medium mb-1">
                DOB <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="dob"
                placeholder="DD-MM-YYYY"
                value={formValues.dob}
                onChange={handleInputChange}
                onBlur={(e) => blurValidation(e)}
                className={`p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100 
                  ${errors.dob ? "border-red-500" : "border-gray-300"}`}
                required
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-2">{errors.dob}</p>
              )}
            </div>

            {/* Religion and Gender - Row 4 */}
            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Religion <span className="text-red-500 font-bold">*</span>
              </label>
              <select
                name="religion"
                value={formValues.religion}
                onChange={handleSelectChange}
                className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100"
                required
              >
                <option value="Hindu">Hindu</option>
                <option value="Sikh">Sikh</option>
                <option value="Muslim">Muslim</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Gender <span className="text-red-500 font-bold">*</span>
              </label>
              <select
                name="gender"
                value={formValues.gender}
                onChange={handleSelectChange}
                className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Category - Row 5 */}
            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Category <span className="text-red-500 font-bold">*</span>
              </label>
              <select
                name="category"
                value={formValues.category}
                onChange={handleSelectChange}
                className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100"
              >
                <option value="OBC">OBC</option>
                <option value="GEN">GEN</option>
                <option value="ST">ST</option>
                <option value="SC">SC</option>
                <option value="EWS">EWS</option>
                <option value="N/W">N/W</option>
                <option value="OTHERS">OTHERS</option>
              </select>
            </div>

            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Subcategory
              </label>
              <input
                type="text"
                name="subcategory"
                value={formValues.subcategory}
                onChange={handleInputChange}
                className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100"
              />
            </div>

            {/* Category dates - Row 6 */}
            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Category Issue Date
              </label>
              <input
                type="date"
                name="categoryIssueDate"
                placeholder="DD-MM-YYYY"
                value={formValues.categoryIssueDate}
                onChange={handleDateChange}
                className={`p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100`}
              />
            </div>

            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Category Valid Upto
              </label>
              <input
                type="date"
                name="categoryValidUpto"
                placeholder="DD-MM-YYYY"
                value={formValues.categoryValidUpto}
                onChange={handleDateChange}
                className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100"
              />
            </div>

            {/* Other Category - Row 7 */}
            <div className="md:col-span-2">
              <label className="block text-blue-800 font-medium mb-1">
                Whether holds any other/state level category{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="flex items-center space-x-4 p-2 bg-blue-50 rounded-md">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="isOtherOrStateCategory"
                    value="YES"
                    checked={formValues.isOtherOrStateCategory === true}
                    onChange={handleRadioChange}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-blue-800">YES</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="isOtherOrStateCategory"
                    value="NO"
                    checked={formValues.isOtherOrStateCategory === false}
                    onChange={handleRadioChange}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-blue-800">NO</span>
                </label>
              </div>
            </div>

            {/* Conditional Other Category fields */}
            {formValues.isOtherOrStateCategory && (
              <>
                <div className="md:col-span-2">
                  <label className="block text-blue-800 font-medium mb-1">
                    Other/State Category{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    name="otherOrStateCategory"
                    value={formValues.otherOrStateCategory}
                    onChange={handleInputChange}
                    className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100"
                    required={formValues.isOtherOrStateCategory}
                  />
                </div>
                <div>
                  <label className="block text-blue-800 font-medium mb-1">
                    Other Category Date of Issue
                  </label>
                  <input
                    type="text"
                    name="otherCategoryDateOfIssue"
                    placeholder="DD-MM-YYYY"
                    value={formValues.otherCategoryDateOfIssue}
                    onChange={handleDateChange}
                    onBlur={(e) => blurValidation(e)}
                    className={`p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100 
                  ${
                    errors.otherCategoryDateOfIssue
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  />
                  <p className="text-red-500 text-sm mt-2">
                    {errors.otherCategoryDateOfIssue}
                  </p>
                </div>

                <div>
                  <label className="block text-blue-800 font-medium mb-1">
                    Other Category Valid Upto
                  </label>
                  <input
                    type="text"
                    name="otherCategoryValidUpto"
                    placeholder="DD-MM-YYYY"
                    value={formValues.otherCategoryValidUpto}
                    onChange={handleDateChange}
                    onBlur={(e) => blurValidation(e)}
                    className={`p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100 
                  ${
                    errors.otherCategoryValidUpto
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  />
                  <p className="text-red-500 text-sm mt-2">
                    {errors.otherCategoryValidUpto}
                  </p>
                </div>
              </>
            )}

            {/* Radio button groups - using col-span-2 for better display */}
            <div className="md:col-span-2">
              <label className="block text-blue-800 font-medium mb-1">
                Whether belongs to Minority{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="flex items-center space-x-4 p-2 bg-blue-50 rounded-md">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="belongsToMinority"
                    value="YES"
                    checked={formValues.belongsToMinority === true}
                    onChange={handleRadioChange}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-blue-800">YES</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="belongsToMinority"
                    value="NO"
                    checked={formValues.belongsToMinority === false}
                    onChange={handleRadioChange}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-blue-800">NO</span>
                </label>
              </div>
            </div>

            {/* More radio button groups - Row by row */}
            <div className="md:col-span-2">
              <label className="block text-blue-800 font-medium mb-1">
                Do you have any State Domicile{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="flex items-center space-x-4 p-2 bg-blue-50 rounded-md">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="domicile"
                    value="YES"
                    checked={formValues.domicile === true}
                    onChange={handleRadioChange}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-blue-800">YES</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="domicile"
                    value="NO"
                    checked={formValues.domicile === false}
                    onChange={handleRadioChange}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-blue-800">NO</span>
                </label>
              </div>
            </div>

            {/* Disability and Ex-Service in same row */}
            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Are you a Person with Benchmark Disability{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="flex items-center space-x-4 p-2 bg-blue-50 rounded-md">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="disability"
                    value="YES"
                    checked={formValues.disability === true}
                    onChange={handleRadioChange}
                    className="mr-2 text-blue-600"
                  />

                  <span className="text-blue-800">YES</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="disability"
                    value="NO"
                    checked={formValues.disability === false}
                    onChange={handleRadioChange}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-blue-800">NO</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Whether Ex-Service Man{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="flex items-center space-x-4 p-2 bg-blue-50 rounded-md">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="exService"
                    value="YES"
                    checked={formValues.exService === true}
                    onChange={handleRadioChange}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-blue-800">YES</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="exService"
                    value="NO"
                    checked={formValues.exService === false}
                    onChange={handleRadioChange}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-blue-800">NO</span>
                </label>
              </div>
            </div>

            {/* Marriage status */}
            <div className="md:col-span-2">
              <label className="block text-blue-800 font-medium mb-1">
                Is Married <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="flex items-center space-x-4 p-2 bg-blue-50 rounded-md">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="isMarried"
                    value="YES"
                    checked={formValues.isMarried === true}
                    onChange={handleRadioChange}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-blue-800">YES</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="isMarried"
                    value="NO"
                    checked={formValues.isMarried === false}
                    onChange={handleRadioChange}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-blue-800">NO</span>
                </label>
              </div>
            </div>

            {/* Identification marks */}
            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Visible Identification Mark 1{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="identificationMark1"
                value={formValues.identificationMark1}
                onChange={handleInputChange}
                className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100"
                required
              />
            </div>

            <div>
              <label className="block text-blue-800 font-medium mb-1">
                Visible Identification Mark 2{" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="identificationMark2"
                value={formValues.identificationMark2}
                onChange={handleInputChange}
                className="p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-100"
                required
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-52 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-8 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium text-lg shadow-md"
            >
              SAVE
            </button>
          </div>
        </form>
        <Outlet />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Profile;

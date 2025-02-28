import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      
      <form>
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Personal Information</h1>
        
        <div className="mb-4">
          <label className="block text-gray-700">First Name <span className="text-red-500 font-bold">*</span></label>
          <input type="text" placeholder="Name" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Last Name <span className="text-red-500 font-bold">*</span></label>
          <input type="text" placeholder="Last Name" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Father's Name <span className="text-red-500 font-bold">*</span></label>
          <input type="text" placeholder="FName" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mother's Name <span className="text-red-500 font-bold">*</span></label>
          <input type="text" placeholder="MName" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Aadhaar Number <span className="text-red-500 font-bold">*</span></label>
          <input type="number" placeholder="Aadhaar number" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">DOB <span className="text-red-500 font-bold">*</span></label>
          <input type="date" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Capture Personal Photo <span className="text-red-500 font-bold">*</span></label>
          <input type="file" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Religion <span className="text-red-500 font-bold">*</span></label>
          <select className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            <option>Hindu</option>
            <option>Sikh</option>
            <option>Muslim</option>
            <option>Others</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Gender <span className="text-red-500 font-bold">*</span></label>
          <select className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category <span className="text-red-500 font-bold">*</span></label>
          <select className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>OBC</option>
            <option>GEN</option>
            <option>ST</option>
            <option>SC</option>
            <option>EWS</option>
            <option>N/W</option>
            <option>OTHERS</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Whether holds any other/state level category <span className="text-red-500 font-bold">*</span></label>
          <select className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Whether belongs to Minority <span className="text-red-500 font-bold">*</span></label>
          <div className="flex items-center">
            <input type="radio" name="minority" className="mr-2" /> YES
            <input type="radio" name="minority" className="mr-2 ml-4" /> NO
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Do you have any State Domicile <span className="text-red-500 font-bold">*</span></label>
          <div className="flex items-center">
            <input type="radio" name="domicile" className="mr-2" /> YES
            <input type="radio" name="domicile" className="mr-2 ml-4" /> NO
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Are you a Person with Benchmark Disability <span className="text-red-500 font-bold">*</span></label>
          <div className="flex items-center">
            <input type="radio" name="disability" className="mr-2" /> YES
            <input type="radio" name="disability" className="mr-2 ml-4" /> NO
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Whether Ex-Service Man <span className="text-red-500 font-bold">*</span></label>
          <div className="flex items-center">
            <input type="radio" name="exServicemen" className="mr-2" /> YES
            <input type="radio" name="exServicemen" className="mr-2 ml-4" /> NO
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Is Married <span className="text-red-500 font-bold">*</span></label>
          <div className="flex items-center">
            <input type="radio" name="maritalStatus" className="mr-2" /> YES
            <input type="radio" name="maritalStatus" className="mr-2 ml-4" /> NO
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Visible Identification Mark 1 <span className="text-red-500 font-bold">*</span></label>
          <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Visible Identification Mark 2 <span className="text-red-500 font-bold">*</span></label>
          <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>

        <div>
          <input type="submit" value="SAVE" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </form>
    </div>
  );
};

export default Profile;

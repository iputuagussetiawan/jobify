import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

// Action function that handles form submission
export const action = async ({ request }) => {
  const formData = await request.formData();

  // Extract the file from formData
  const file = formData.get('avatar');

  // File size validation
  if (file && file.size > 500000) {
    toast.error('Image size too large');
    return null;
  }

  try {
    // Send formData directly to support file uploads
    await customFetch.patch('/users/update-user', formData);
    toast.success('Profile updated successfully');
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'Failed to update profile');
  }

  return null;
};

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // Client-side file validation for image size
  const handleFileValidation = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 500000) {
      toast.error('Image size too large (max 0.5 MB)');
      e.target.value = ''; // Clear file input if the file is too large
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          {/* Image file input with client-side validation */}
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
              onChange={handleFileValidation} // Client-side validation
            />
          </div>

          {/* Form fields for user details */}
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            labelText="Last name"
            name="lastName"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />

          {/* Submit button */}
          <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Save changes'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
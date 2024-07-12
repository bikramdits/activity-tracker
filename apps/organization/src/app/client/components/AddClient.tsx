import { Typography } from '@mui/material';
import { BackIcon } from '@appname/assets';
import { InputField,Loader, Button, ButtonWithIcon, showToast } from '@appname/ui';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { AddClientSchema } from './schemas/AddClientSchema';
import { FormValuesprops } from '../../types/clientsTypes';
import {
  useClientById,
  useClients,
  useCreateClient,
  useUpdateClient,
} from '../../hooks/useClients';
import { ClientsEnum, addClientEnum } from '../enums/Clientsenum';

type ButtonStyleProps = React.CSSProperties & {
  '&:hover'?: React.CSSProperties;
};
function AddClient() {
  const [loader, setLoader] = React.useState(false);
  const [initialValues, setInitialValues] = useState<FormValuesprops>({
    organizationName: '',
    clientCode: '',
  });
  const {data:isLoading} = useClients({})

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('../');
  };
  const params = useParams();
  const { id } = params;
  const { data } = useClientById(id);
  const { mutateAsync: updateClientMutation } = useUpdateClient();
  const { mutateAsync } = useCreateClient();

  useEffect(() => {
    if (data) {
      const client = data?.data?.clients;
      setInitialValues({
        organizationName: client?.organizationName || '',
        clientCode: client?.clientCode || '',
      });
    }
  }, [data ]);

  const addClient = async (values: FormValuesprops) => {
    setLoader(true);
    try {
      const response = await mutateAsync({
        organizationName: values.organizationName,
        clientCode: values.clientCode,
      });
      if (response.statusCode === 201) {
        showToast(response.message, 'success');
        setLoader(false);
        setTimeout(() => {
          navigate('../');
        }, 700);
      } else {
        showToast(response.errorRes, 'error');
        setLoader(false);
      }
      
    } catch (error) {
      showToast(`${error}`, 'error');
    }
  };

  const updateClient = async (values: FormValuesprops) => {
    setLoader(true);
    const updatedValues = {
      organizationName: values.organizationName,
      clientCode: values.clientCode,
    };
    try {
      const response = await updateClientMutation({
        id: id,
        formValues: updatedValues,
      });
      if (response.statusCode === 201) {
        showToast(response.message, 'success');
        setLoader(false);
        navigate('../');
      } else {
        showToast(response.message, 'error');
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 w-full pb-2 mt-16 overflow-hidden">
      {/* topheader */}
      <div className="headerdiv flex justify-between p-3 mt-2 -mb-2">
        <div className="text px-3 ">
          <Typography
            variant="h5"
            component="h5"
            className="text-[26px] md:font-bold"
          >
            <h2 className="mt-2 text-2xl/[26px] font-semibold">
              {id ? addClientEnum.EDIT_CLIENT : addClientEnum.ADD_NEW_CLIENT}
            </h2>{' '}
          </Typography>
        </div>
        <div className="backbtn">
          <ButtonWithIcon
            icon={
              <BackIcon
                sx={{
                  fontSize: '17px',
                  stroke: '#3c59d4',
                  strokeWidth: 1.5,
                }}
              />
            }
            onClick={handleBackClick}
            sx={
              {
                color: '#3c59d4',
                backgroundColor: 'white',
                fontSize: '17px',
                border: '1px solid #0070fa',
                fontWeight: '550',
                padding: '6px 12px',
                textTransform: 'none',
                height: '44px',
                '&:hover': {
                  backgroundColor: '#cae2ff',
                  borderColor: '#3c59d4',
                  textTransform: 'none',
                },
              } as ButtonStyleProps
            }
          >
            {addClientEnum.BACK}
          </ButtonWithIcon>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={id ? updateClient : addClient}
        validationSchema={AddClientSchema}
        enableReinitialize={true}
      >
        {({ values, handleChange, errors, touched, resetForm }) => {
          return (
            <Form>
              <div
                 className="m-3 border border-slate-300  bg-white rounded-lg"
                style={{ height: '91%' }}
              >
                {/* inputfielddiv */}
                <div className="inputdiv flex justify-around mt-4 py-2 px-2.5">
                  <div className="leftinputdiv w-2/4 px-2">
                    <InputField
                      name="organizationName"
                      label={
                        <span>
                          {ClientsEnum.ORGANIZATION_Name}
                          <span className="text-red-500 text-sm ml-[2px]">
                            *
                          </span>
                        </span>
                      }
                      id="organizationName"
                      variant="outlined"
                      className="w-full text-sm"
                      type="text"
                      onChange={handleChange}
                      value={values.organizationName}
                      error={
                        touched.organizationName ? errors.organizationName : ''
                      }
                    />
                    {errors &&
                      errors.organizationName &&
                      touched.organizationName && (
                        <div className="justify-start text-start">
                          <span className="text-red-500 text-sm ml-2 ">
                            {errors.organizationName}
                          </span>
                        </div>
                      )}
                  </div>
                  <div className="rightinputdiv w-2/4 px-2">
                    <InputField
                      name="clientCode"
                      label={
                        <span>
                          {ClientsEnum.CLIENT_CODE}
                          <span className="text-red-500 text-sm ml-[2px]">
                            *
                          </span>
                        </span>
                      }
                      id="description"
                      variant="outlined"
                      className="w-full text-sm"
                      type="text"
                      onChange={handleChange}
                      value={values?.clientCode}
                      error={touched.clientCode ? errors.clientCode : ''}
                    />
                    {errors && errors.clientCode && touched.clientCode && (
                      <div className="justify-start text-start">
                        <span className="text-red-500 text-sm ml-2 ">
                          {errors.clientCode}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {/* buttondiv  */}
                <div className="btndiv  flex justify-end mt-4">
                  <div className="btnrightdiv mr-3 py-3 gap-1 ">
                    <Button
                      type="reset"
                      sx={{
                        fontSize: '15px',
                        lineHeight: '1.5',
                        height: '44px',
                        textTransform: 'none',
                        padding: '6px 12px',
                        fontWeight: '550',
                        color: '#3c59d4',
                        marginRight: '10px',
                        '&:hover': { backgroundColor: '#cae2ff' },
                      }}
                      onClick={resetForm}
                    >
                      {addClientEnum.CANCEL}
                    </Button>
                    <Button
                      sx={{
                        fontSize: '15px',
                        lineHeight: '1.5',
                        height: '44px',
                        textTransform: 'none',
                        padding: '6px 12px',
                        border: '1px solid #3c59d4',
                        fontWeight: '550',
                        color: '#3c59d4',
                        '&:hover': { backgroundColor: '#cae2ff' },
                      }}
                      type="submit"
                    > 
                    {loader ? (
                      <Loader/>
                    ): id ? (addClientEnum.UPDATE): (addClientEnum.SAVE)}
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
export default AddClient;

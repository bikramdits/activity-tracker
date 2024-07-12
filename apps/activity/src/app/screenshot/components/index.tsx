import DateRangeDropdown from './DateRangeDropdown';
import { useState, useEffect } from 'react';
import { MultipleSelect } from '@appname/ui';
import {
  useGetAllDepartments,
  useGetAllPeople,
  useGetAllProject,
  useScreenshots,
  useGetAllClients,
} from '../../hooks/UseActivity';
import TimeScreenshot from './TimeScreenshot';
import { Typography } from '@mui/material';

const Screenshots = () => {
  const initialDateRange = {
    startDate: new Date().setDate(new Date().getDate() - 30),
    endDate: Date.now(),
  }
  const [selectedValue, setSelectedValue] = useState({
    Department: [],
    Client: [],
    Project: [],
    Manager: [],
    dateRange:initialDateRange
  });
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<string[]>([]);
  const [selectedClient, setSelectedClient] = useState<string[]>([]);
  const [selectedDepart, setSelectedDepart] = useState<string[]>([]);
  const [type, setType] = useState<string>('');
  const [id, setId] = useState<string>('');
  const screenshotTime = useScreenshots({
    startDate: selectedValue.dateRange.startDate || '',
    endDate: selectedValue.dateRange.endDate || '',
    filterBy:
      selectedProject?.length ||
      selectedOptions?.length ||
      selectedDepart?.length ||
      selectedClient?.length
        ? id
        : '',
    filterValue:
      type === 'project'
        ? selectedProject
        : type === 'people'
        ? selectedOptions
        : type === 'Departments'
        ? selectedDepart
        : selectedClient,
  });

  const handleDateChange = (startDate: number, endDate: number) => {
    setSelectedValue((p) => ({
      ...p,
      dateRange: {
        startDate,
        endDate,
      },
    }));
    setTimeout(() => {
      screenshotTime.refetch();
    }, 300);
  };

  // People filtering by ID
  const { data } = useGetAllPeople({});
  const peopleOptions = data?.data?.users.map((ele: any) => ({
    label: ele.firstName + ele.lastName,
    value: ele.id,
  }));

  const changeOptions = (
    type: 'project' | 'people' | 'Clients' | 'Departments',
    value: string[]
  ) => {
    
    setType(type);
    screenshotTime.refetch();
    if (type === 'project') {
      setSelectedProject(value);
      setId('projectId');
    } else if (type === 'people') {
      setId('userId');
      setSelectedOptions(value);
    } else if (type === 'Departments') {
      setId('departmentId');
      setSelectedDepart(value);
    } else if (type === 'Clients') {
      setId('clientId');
      setSelectedClient(value);
    }
  };

  useEffect(() => {
    screenshotTime.refetch()
    if (selectedOptions.length) {
      screenshotTime.refetch();
    }
    if (selectedProject.length) {
      screenshotTime.refetch();
    }
    if (selectedDepart.length) {
      screenshotTime.refetch();
    }
    if (selectedClient.length) {
      screenshotTime.refetch();
    }
  }, [selectedOptions, id, selectedProject, selectedDepart, selectedClient]);

  //filtering by IDs
  const { data: projectData } = useGetAllProject({});
  const projectOptions = projectData?.data?.projects?.map((ele: any) => ({
    label: ele.name,
    value: ele.id,
  }));

  const { data: DepartmentData } = useGetAllDepartments({});
  const DepartmentOptions = DepartmentData?.data?.departments?.map(
    (ele: any) => ({
      label: ele.name,
      value: ele.id,
    })
  );

  const { data: ClientData } = useGetAllClients({});
  const ClientOptions = ClientData?.data?.clients?.map((ele: any) => ({
    label: ele.organizationName,
    value: ele.id,
  }));

  return (
    <div className="maindiv bg-gray-50 w-full pb-2 mt-16">
      <div className="flex justify-between p-3 mt-2 -mb-2">
        <Typography
          variant="h5"
          component="h5"
          className="text-[26px] md:font-bold"
        >
          <h2 className="mt-2 text-2xl/[26px] font-semibold"> Screenshots</h2>
        </Typography>
      </div>
      <div className="bg-white z-10 h-4/5 overflow-scroll border rounded-tl-lg rounded-tr-lg border-gray-300 overflow-x-hidden m-3">
        <div className="border-b border-gray-200 p-4 sticky top-0 bg-white z-10">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="selectDropdown">
              <MultipleSelect
                options={DepartmentOptions}
                label="Department"
                placeholder="--Department--"
                value={selectedDepart}
                onChange={(value) => changeOptions('Departments', value)}
              />
            </div>
            <div className="selectDropdown">
              <MultipleSelect
                options={ClientOptions}
                label="Client"
                placeholder="--Client--"
                isMultiple
                value={selectedClient}
                onChange={(value) => changeOptions('Clients', value)}
              />
            </div>
            <div className="selectDropdown">
              <MultipleSelect
                options={projectOptions}
                label="Project"
                placeholder="--Project--"
                isMultiple
                value={selectedProject}
                onChange={(value) => changeOptions('project', value)}
              />
            </div>
            <div className="selectDropdown w-32">
              <MultipleSelect
                options={peopleOptions}
                label="People"
                placeholder="All"
                value={selectedOptions}
                onChange={(value) => changeOptions('people', value)}
                isMultiple
              />
            </div>
            <div className="relative w-full sm:w-48">
              <p className="absolute left-2 top-[-10px] bg-white z-10 px-2 text-blue-600">
                Date Range
              </p>
              <DateRangeDropdown
                onDateChange={handleDateChange}
                selected={{
                  startDate: 0,
                  endDate: 0,
                }}
              />
            </div>
          </div>
        </div>
        <div className="relative flex flex-col w-full h-screen">
          <TimeScreenshot
            screenshotTime ={screenshotTime?.data} refetch={screenshotTime?.refetch} error={screenshotTime?.error} 
          />
        </div>
      </div>
    </div>
  );
};

export default Screenshots;

import React, { useEffect, useState } from "react";
import { User, columns } from "./columns";
import IncidentReportTable from "./IncidentReportTable";
import { handleUnauthorizedError } from "@/utils/utilityFunctions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getChildrenIncidentList } from "@/services/incidentManagement";
import moment from "moment";
import { ToastContainer } from "react-toastify";

const IncidentReport: React.FC<any> = ({ selectedOption, selectedReport }) => {
  const [childincidentlist, setChildIncidentList] = useState([]);
  const [exportdata, setExportData] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [incidentId, setIncidentId] = useState<string | number>("");

  // function to open editmodal
  const openEditModal = (id: string | number) => {
    setEditModalOpen(true);
    setIncidentId(id);
  };

  // this function will close the modal
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const openViewModal = (id: string | number) => {
    setViewModalOpen(true);
    setIncidentId(id);
  };

  // this function will close the modal
  const closeviewModal = () => {
    setViewModalOpen(false);
  };
  let router = useRouter();
  const getChildrenIncident = async () => {
    try {
      let res = await getChildrenIncidentList();
      if (res?.success) {
        let resarray: any = []
        let exportArr: any = []
        res?.data.map((item: any) => {
          resarray.push({
            id: item.id,
            childName: item.child_info,
            associatedClass: item.classroom_name,
            age: item.age,
            notifiedName: item.notified_parent_name,
            incidentType: item.incident_type,
            dateIncident: moment(item.date_of_incident).format("MM/DD/YYYY"),
            timeNotified: item.time_of_incident,
            staffPresent: item.present_staff_name,
            openViewModal: openViewModal,
            openEditModal: openEditModal,
            setIncidentId: setIncidentId,
          });
          exportArr.push({
            id: item.id,
            childName: item.child_info.child_name,
            associatedClass: item.classroom_name,
            age: item.age,
            notifiedName: item.notified_parent_name,
            incidentType: item.incident_type,
            dateIncident: moment(item.date_of_incident).format("MM/DD/YYYY"),
            timeNotified: item.time_of_incident,
            staffPresent: item.present_staff_name,
          });
        });

        setChildIncidentList(resarray);
        setExportData(exportArr);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        handleUnauthorizedError(router);
      }
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getChildrenIncident();
  }, []);

  return (
    <>
      <IncidentReportTable
        columns={columns}
        data={childincidentlist}
        getChildrenIncident={getChildrenIncident}
        openViewModal={openViewModal}
        closeViewModal={closeviewModal}
        viewModalOpen={viewModalOpen}
        editModalOpen={editModalOpen}
        openEditModal={openEditModal}
        closeEditModal={closeEditModal}
        incidentId={incidentId}
        exportdata={exportdata}
      />
      <ToastContainer />
    </>
  );
};

export default IncidentReport;

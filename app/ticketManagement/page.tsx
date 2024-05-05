import TicketTable from "./TicketTable"
import { mainColumns, Main } from "./mainColumns"
import { Staff, staffColumns } from "./staffColumns"

const mainData : Main[] = [
    {
        ticketId : "AB_123_XYZ",
        createdBy : "Lorem ipsum",
        category : "Technical",
        problem : "Lorem ipsum",
        dateCreated: new Date(),
        updatedOn: new Date(),
        assignedTo: "Lorem ipsum",
        status: "Unassigned",
        mark: "Mark Closed"
    }
]
const staffData : Staff[] = [
    {
        ticketId : "AB_123_XYZ",
        category : "Technical",
        problem : "Lorem ipsum",
        dateCreated: new Date(),
        updatedOn: new Date(),
        status: "Unassigned",
        reminder: "Send Reminder"
    }
]

const Page = () => {
  return (
    <main className="p-4 h-[87.8%]">
        <section
          className="[box-shadow:rgba(50,_50,_93,_0.25)_0px_6px_12px_-2px,_rgba(0,_0,_0,_0.3)_0px_3px_7px_-3px] h-full
            text-[#FFFFFF] p-6 overflow-auto
            "
        >
          <div className="mb-2">
          </div>
          {/* <TicketTable columns={mainColumns} data={mainData} /> */}
          <TicketTable columns={staffColumns} data={staffData} />
        </section>
      </main>
  )
}

export default Page
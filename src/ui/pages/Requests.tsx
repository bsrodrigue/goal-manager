import { observer } from "mobx-react-lite";
import { partnershipRequestStore } from "../../mobx/models";
import { IPartnershipRequest } from "../../types";

const RequestsPage = observer(() => {

  return (
    <div className="flex flex-col justify-between h-full">

      <ul className="ul bg-gm-100 px-3 py-1 bg-opacity-75 rounded">
        {
          partnershipRequestStore.toMe.map((req: IPartnershipRequest) => {
            console.log(req.goal);

            return (

              <li key={req.id} className="flex items-center justify-between my-2">
                <p></p>
                <div>
                  <button
                    className="btn btn-sm"
                  >
                    Accept
                  </button>
                </div>
              </li>
            )
          }
          )
        }
      </ul>


    </div>
  )
});

export default RequestsPage;


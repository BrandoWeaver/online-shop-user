import { useRef } from "react";
import InboxTabs from "./MyInbox";
import { useRequest } from "ahooks";
import { NOTIFICATION_API } from "../../api/Notification";
import { PROMOTIONPRODUCT_API } from "../../api/PromoteProduct";
import ErrDialog, { IErrDialogRef } from "../../components/Dialog/ErrorDialog";

function Inbox() {
  const errRef = useRef<IErrDialogRef>(null);

  const {
    data: dataNotification,
    loading: loadingNotification,
    error: errorNotification,
    refresh: refreshNotification,
  } = useRequest(NOTIFICATION_API.getNotification, {
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (err) => {
      errRef.current?.open("Error Occured");
    },
  });
  const {
    data: dataListProductPromotion,
    loading: loadingProductPromtionList,
    error: errorProductPromotion,
    refresh: refreshProductPromotion,
  } = useRequest(PROMOTIONPRODUCT_API.getProductPromoteList, {
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (err) => {
      errRef.current?.open(err);
    },
  });
  return (
    <div>
      <ErrDialog ref={errRef} />
      <InboxTabs
        dataNotification={dataNotification?.notifications}
        dataListProductPromotion={dataListProductPromotion?.promotionProducts}
        loadingNotification={loadingNotification}
        loadingProductPromtionList={loadingProductPromtionList}
        errorNotification={errorNotification}
        errorProductPromotion={errorProductPromotion}
        refreshNotification={refreshNotification}
        refreshProductPromotion={refreshProductPromotion}
      />
    </div>
  );
}

export default Inbox;

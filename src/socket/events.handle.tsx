// /* eslint-disable react-hooks/exhaustive-deps */
// import { Socket } from 'socket.io-client';

// import {
//   ECodeRole,
//   EDashboardFilterType,
//   EDashboardForwarderType,
//   EDocumentType
// } from '@config';
// import {
//   CallbackEvents,
//   IDashboardFilterParams,
//   TEmitSocketEventsChatMap,
//   TEmitSocketEventsDashboardMap,
//   TListenSocketEventsChatMap,
//   TListenSocketEventsDashboardMap
// } from '@interfaces';
// import {
//   AppDispatch,
//   DEFAULT_DASHBOARD_LIMIT,
//   addNewAuction,
//   addNewBoxChat,
//   addNewMessage,
//   loadMoreMessage,
//   pushNewMessageToListBoxChat,
//   removeAuction,
//   setCanLoadMoreDashboard,
//   setCanLoadMoreListBoxChat,
//   setCanLoadMoreListMessage,
//   setChatusersInformation,
//   setDashboardStatistics,
//   setDashboardTotalCount,
//   setListAuction,
//   setListBoxChat,
//   setListDocument,
//   setListFileChat,
//   setListImageChat,
//   setListMesssage,
//   store,
//   updaListAuction,
//   updateAuction,
//   updateAuctionEnddate,
//   updateConfirmDelivered
// } from '@redux';
// import { LogApp } from '@utils';
// import { chatApi } from '@api';

// export const linkDashboardSocketEvents = (
//   socket: Socket<
//     TListenSocketEventsDashboardMap,
//     TEmitSocketEventsDashboardMap
//   >,
//   dispatch: AppDispatch
// ): CallbackEvents<IDashboardFilterParams> => ({
//   clean() {
//     socket.off('dashboard-info');
//     socket.off('list-auction');
//     socket.off('lowest-bid');
//     socket.off('auction-end-date');
//     socket.off('delete-auction');
//     socket.off('decline-offer');
//     socket.off('manufacturer-confirm-delivered');
//     socket.off('manufacturer-confirm-offer');
//     socket.off('forwarder-confirm-delivered');
//     socket.off('forwarder-confirm-offer');
//     socket.off('dashboard-statistics');
//     socket.off('expired-time-choose-offer');
//     socket.off('expired-time-confirm-offer');
//   },
//   emit() {
//     // const param = {
//     //   ...params,
//     //   startReadyDate: params?.startReadyDate,
//     //   endReadyDate: params?.endReadyDate
//     // };
//     // socket.emit('get-list-auction', param);
//   },
//   link() {
//     socket.on('dashboard-info', data => {
//       dispatch(setDashboardTotalCount(data));
//     });
//     socket.on('dashboard-statistics', data => {
//       dispatch(setDashboardStatistics(data));
//     });
//     socket.on('list-auction', data => {
//       LogApp('list-auction', data);
//       const currentPage = store.getState().dashboard?.filterOptions?.page;
//       if (currentPage === 1 && data.length === 0) {
//         dispatch(setListAuction([]));
//       } else if (currentPage === 1 && data.length > 0) {
//         dispatch(setListAuction(data));
//         if (data.length >= DEFAULT_DASHBOARD_LIMIT) {
//           dispatch(setCanLoadMoreDashboard(true));
//         }
//         return;
//       } else {
//         data.forEach(item => {
//           dispatch(updaListAuction(item));
//         });
//         if (data.length === 0) {
//           dispatch(setCanLoadMoreDashboard(false));
//         }
//       }
//     });
//     socket.on('lowest-bid', data => {
//       const currentRole = store.getState().auth?.accountInfo?.user?.currentRole;
//       const currentFilterType = store.getState().dashboard?.filterOptions?.type;
//       if (
//         currentFilterType === EDashboardForwarderType.LIVE_AUCTION ||
//         currentFilterType === EDashboardForwarderType.ALL_AUCTION
//       ) {
//         dispatch(updateAuction(data));
//       } else if (currentRole === ECodeRole.MANUFACTURER)
//         dispatch(updateAuction(data));
//     });
//     socket.on('auction-end-date', data => {
//       dispatch(updateAuctionEnddate(data));
//     });
//     socket.on('delete-auction', id => {
//       dispatch(removeAuction(id));
//     });
//     socket.on('decline-offer', data => {
//       dispatch(updateAuction(data));
//     });
//     socket.on('manufacturer-confirm-delivered', data => {
//       dispatch(removeAuction(data));
//     });
//     socket.on('manufacturer-confirm-offer', data => {
//       const filterType = store.getState().dashboard?.filterType;
//       if (filterType === EDashboardFilterType.CONFIRMED) {
//         dispatch(addNewAuction(data));
//       }
//     });
//     socket.on('forwarder-confirm-delivered', data => {
//       dispatch(
//         updateConfirmDelivered({
//           type: 'forwarderConfirmDelivered',
//           auctionId: data
//         })
//       );
//     });
//     socket.on('forwarder-confirm-offer', data => {
//       dispatch(removeAuction(data?.id));
//     });
//     socket.on('expired-time-choose-offer', data => {
//       dispatch(removeAuction(data.auctionId));
//     });
//     socket.on('expired-time-confirm-offer', data => {
//       dispatch(removeAuction(data));
//     });
//   }
// });

// export const linkChatSocketEvents = (
//   socket: Socket<TListenSocketEventsChatMap, TEmitSocketEventsChatMap>,
//   dispatch: AppDispatch
// ): CallbackEvents<any> => ({
//   clean() {
//     socket.off('chats');
//     socket.off('get-documents');
//     socket.off('messages');
//     socket.off('receive-message');
//   },
//   link() {
//     socket.on('chats', res => {
//       const data = res.items ?? [];
//       const currentPage = store.getState().chat?.listBoxChatParams?.page;
//       if (currentPage === 1) {
//         dispatch(setListBoxChat(data));
//         return;
//       } else {
//         data.forEach(item => {
//           dispatch(addNewBoxChat(item));
//         });
//       }
//       if (currentPage === res.totalPage) {
//         dispatch(setCanLoadMoreListBoxChat(false));
//       } else {
//         dispatch(setCanLoadMoreListBoxChat(true));
//       }
//     });
//     socket.on('get-documents', data => {
//       const currentDocumentType = store.getState().chat?.listDocumentParams;
//       if (currentDocumentType?.documentType === EDocumentType.FILE) {
//         dispatch(setListFileChat(data));
//       } else {
//         dispatch(setListImageChat(data));
//       }
//       dispatch(setListDocument(data));
//     });
//     socket.on('messages', res => {
//       const data = res.items ?? [];
//       const currentPage = store.getState().chat?.listMessageParams?.page;
//       if (currentPage === 1) {
//         dispatch(setListMesssage(data));
//         return;
//       } else {
//         data.forEach(item => {
//           dispatch(loadMoreMessage(item));
//         });
//       }
//       if (currentPage === res.totalPage) {
//         dispatch(setCanLoadMoreListMessage(false));
//       } else {
//         dispatch(setCanLoadMoreListMessage(true));
//       }
//     });
//     socket.on('receive-message', async data => {
//       LogApp('receive-message', data);
//       dispatch(addNewMessage(data));
//       const existInList = store
//         .getState()
//         .chat?.listBoxChat?.some(item => item?.id === data?.chatId);
//       if (existInList)
//         dispatch(
//           pushNewMessageToListBoxChat({
//             message: data
//           })
//         );
//       else if (data?.chatId) {
//         try {
//           const res = await chatApi.getInforChat(data.chatId);
//           dispatch(
//             pushNewMessageToListBoxChat({
//               message: data,
//               boxChat: res?.data
//             })
//           );
//         } catch (error) {
//           LogApp('getInforChat error', error);
//         }
//       }
//     });
//     socket.on('view-chat-information', data => {
//       dispatch(setChatusersInformation(data));
//     });
//   }
// });

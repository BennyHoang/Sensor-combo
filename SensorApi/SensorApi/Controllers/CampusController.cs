using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Xml.Linq;
using SensorApi.Models;

namespace SensorApi.Controllers
{
    public class CampusController : ApiController
    {
        DateTime localDate = DateTime.Now;

        public HttpResponseMessage PostRoom(Room _room)
        {
            XElement roomXML = XElement.Load(GetFilePath());

            roomXML.Add(
                    new XElement("room",
                        new XElement("id", _room.Id),
                        new XElement("device", _room.Device),
                        new XElement("floor", _room.Floor),
                        new XElement("description", _room.Description),
                        new XElement("datecreated", localDate)

                    )
                );
            roomXML.Save(GetFilePath());
            return Request.CreateResponse(HttpStatusCode.Created, _room);
        }

        public HttpResponseMessage DeleteRoom(int id)
        {
            XElement roomXML = XElement.Load(GetFilePath());
            var selectRoom = (from room in roomXML.Descendants("room")
                              where (int)room.Element("id") == id
                              select room).SingleOrDefault();
            selectRoom.Remove();
            roomXML.Save(GetFilePath());
            return Request.CreateResponse(HttpStatusCode.OK, selectRoom);
        }

        public HttpResponseMessage PutRoom(Room _room)
        {
            XElement roomXML = XElement.Load(GetFilePath());

            var selectRoom = (from room in roomXML.Descendants("room")
                              where (int)room.Element("id") == _room.Id
                              select room).SingleOrDefault();
            selectRoom.SetElementValue("device", _room.Device);
            selectRoom.SetElementValue("description", _room.Description);
            selectRoom.SetElementValue("floor", _room.Floor);
            selectRoom.SetElementValue("datecreated", localDate);
            roomXML.Save(GetFilePath());

            return Request.CreateResponse(HttpStatusCode.OK, selectRoom);
        }

        public HttpResponseMessage GetAllRooms()
        {
            XElement roomXML = XElement.Load(GetFilePath());

            var roomList = from rooms in roomXML.Descendants("room")
                           select rooms;
            return Request.CreateResponse(HttpStatusCode.OK, roomList);
        }
        public HttpResponseMessage GetRoomById(int? id)
        {
            XElement roomXML = XElement.Load(GetFilePath());

            var selectRoom = (from rooms in roomXML.Descendants("room")
                                   where (int)rooms.Element("id") == id
                                   select rooms).SingleOrDefault();
            return Request.CreateResponse(HttpStatusCode.OK, selectRoom);
        }


        private String GetFilePath()
        {
            return System.Web.Hosting.HostingEnvironment.MapPath(@"~/App_Data/campusDB.xml");
        }
    }
}

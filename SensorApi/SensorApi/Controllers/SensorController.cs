using SensorApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SensorApi.Controllers
{
    public class SensorController : ApiController
    {
        public HttpResponseMessage GetAllSensorData()
        {

            using (SensorORMDataContext sensorOrm = new SensorORMDataContext())
            {
                List<sensorDataTable> sensorList = (from sensorDataTable in sensorOrm.sensorDataTables
                                                    select sensorDataTable).ToList();




                return Request.CreateResponse(HttpStatusCode.OK, sensorList, Configuration.Formatters.JsonFormatter);
            }
        }
        public HttpResponseMessage GetLatestSensorData()
        {
            using (SensorORMDataContext sensorOrm = new SensorORMDataContext())
            {
                List<sensorDataTable> sensorList = (from sensorDataTable in sensorOrm.sensorDataTables
                                               select sensorDataTable).ToList();
                
                var count = sensorList.Count;

               
                
                return Request.CreateResponse(HttpStatusCode.OK, sensorList.Skip(count - 10), Configuration.Formatters.JsonFormatter);
            }   
        }
    }
}

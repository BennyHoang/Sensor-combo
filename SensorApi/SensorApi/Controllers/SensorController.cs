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
        public IEnumerable<sensorDataTable> GetSensorDatas()
        {
            using (SensorOrmDataContext sensorOrm = new SensorOrmDataContext())
            {
                List<sensorDataTable> sensorList = (from sensorDataTable in sensorOrm.sensorDataTables
                                               select sensorDataTable).ToList();
                var count = sensorList.Count;

                return sensorList.Skip(count - 10);
            }   
        }
    }
}

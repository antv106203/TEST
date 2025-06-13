// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa500px } from '@fortawesome/free-brands-svg-icons';
import { faBuilding, faFingerprint, faHollyBerry, faMicrochip, faUser } from '@fortawesome/free-solid-svg-icons';
import { accessChartData, generalInfomation, recentHistoryAccess } from '../../service/generalAPI';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';
import { formatAccessTime } from '../../utils/DateUtils';
import API_CONFIG from '../../config/ApiConfig';
import { io } from "socket.io-client";
const socket = io(API_CONFIG.API_HOST);





const Dashboard = () => {

  const [range, setRange] = useState('today');
  const chartDataToday = [
    { name: '7h', success: 3, fail: 1 },
    { name: '9h', success: 5, fail: 0 },
    { name: '11h', success: 6, fail: 2 },
    { name: '13h', success: 4, fail: 1 },
    { name: '15h', success: 7, fail: 3 },
  ];

  const chartDataWeek = [
    { name: 'T2', success: 10, fail: 4 },
    { name: 'T3', success: 8, fail: 6 },
    { name: 'T4', success: 12, fail: 3 },
    { name: 'T5', success: 14, fail: 7 },
    { name: 'T6', success: 11, fail: 8 },
    { name: 'T7', success: 9, fail: 5 },
    { name: 'CN', success: 6, fail: 2 },
  ];

  const chartDataMonth = [
    { name: 'Tuần 1', success: 35, fail: 10 },
    { name: 'Tuần 2', success: 40, fail: 14 },
    { name: 'Tuần 3', success: 32, fail: 8 },
    { name: 'Tuần 4', success: 45, fail: 12 },
  ];

  const chartData =
    range === 'today' ? chartDataToday : range === 'week' ? chartDataWeek : chartDataMonth;

  const [generalInfo, setGeneralInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [listRecentHistory, setListRecentHistory] = useState([]);
  const [infoChartData, setInfoChartData] = useState([]);

  const fetchGeneralInfo = async () => {
    setLoading(true);
    try {
      const result = await generalInfomation();
      if(result.status_code === 200){
        setGeneralInfo(result.data);
        setLoading(false);
      }
      else {
        setLoading(false);
        toast.error(result.message);
      }
    } catch (error) {
      
    } finally{
      setLoading(false)
    }
  }
  const fetchListRecentHistoryAccess = async () => {
    setLoading(true);
    try {
      const result = await recentHistoryAccess();
      if(result.status_code === 200){
        setListRecentHistory(result.data);
        setLoading(false);
      }
      else {
        setLoading(false);
        toast.error(result.message);
      }
    } catch (error) {
      
    } finally{
      setLoading(false)
    }
  }
  const fetchAccessChartData = async () => {
    setLoading(true);
    try {
      const result = await accessChartData(range);
      console.log(result);
      if(result.status_code === 200){
        setLoading(false);
        setInfoChartData(result.data)
      }
      else {
        setLoading(false);
        toast.error(result.message);
      }
    } catch (error) {
      
    } finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchGeneralInfo();
  }, [])
  useEffect(() => {
    fetchListRecentHistoryAccess();
  }, [])
  useEffect(() => {
    fetchAccessChartData();
  }, [range])


  useEffect(() => {
    const handler = () => {
        fetchListRecentHistoryAccess();
        fetchAccessChartData(); // dùng `range` trong hàm này
    };

    socket.on("access-log-updated", handler);

    return () => {
        socket.off("access-log-updated", handler);
    };
}, [range]);
  return (
    <>
      {loading && < Loading />}
      <div className="dashboard-container">
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Tổng quan</h2>
          <div className="dashboard-section-summary">
            <div className="dashboard-section-summary-card">
              <div className="dashboard-section-summary-card-icon-circle">
                <FontAwesomeIcon icon={faBuilding} />
              </div>
              <span>Phòng ban</span>
              <strong>{generalInfo.totalDepartments}</strong>
            </div>
            <div className="dashboard-section-summary-card">
              <div className="dashboard-section-summary-card-icon-circle">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <span>Nhân viên</span>
              <strong>{generalInfo.totalUsers}</strong>
            </div>
            <div className="dashboard-section-summary-card">
              <div className="dashboard-section-summary-card-icon-circle">
                <FontAwesomeIcon icon={faFingerprint} />
              </div>
              <span>Vân tay</span>
              <strong>{generalInfo.totalFingerprints}</strong>
            </div>
            <div className="dashboard-section-summary-card">
              <div className="dashboard-section-summary-card-icon-circle">
                <FontAwesomeIcon icon={faMicrochip} />
              </div>
              <span>Thiết bị</span>
              <strong>{generalInfo.totalDevices}</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-main">
          <div className="dashboard-main-chart">
            <div className="dashboard-chart-header">
              <h3>Thống kê ra vào gần đây</h3>
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="dashboard-range-select"
              >
                <option value="today">Hôm nay</option>
                <option value="week">Tuần này</option>
                <option value="month">Tháng này</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={infoChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="success" stroke="green" name="Thành công" />
                <Line type="monotone" dataKey="failed" stroke="red" name="Thất bại" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="dashboard-access-history">
            <h3>Lịch sử truy cập mới nhất</h3>
            {listRecentHistory.map((access, index) => (
              <div className="dashboard-access-entry" key={index}>
                <div
                  className="dashboard-access-avatar-circle"
                  style={{ backgroundImage: `url(${access?.user_id?.avatar})` }}
                ></div>
                {
                  access.result === 'success' ? 
                  (<span className="dashboard-access-name">{access?.user_id?.full_name}</span>)
                  : (access?.user_id ? (<span className="dashboard-access-name">{access?.user_id?.full_name}</span>) : (<span className="dashboard-access-name">Không xác định</span>))
                }
                <span className="dashboard-access-time">{formatAccessTime(access.access_time)}</span>
                <span className={`dashboard-access-status ${access.result}`}>{access.result === 'success' ? '✔' : '✘'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
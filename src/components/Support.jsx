import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import icon0 from '../assets/icon0.svg';
import miFilter0 from '../assets/mi-filter0.svg';
import group0 from '../assets/group0.svg';
import miFilter1 from '../assets/mi-filter1.svg';
import group1 from '../assets/group1.svg';
import group2 from '../assets/group2.svg';
import CreateTicketModal from './CreateTicketModal';

const Support = ({ tickets: propTickets, onTicketSubmit, title = "Support", onViewTicket, showCreateTicketButton = true }) => {
  const navigate = useNavigate();
  
  // Sample ticket data - in a real app, this would come from props or state
  const defaultTickets = [
    { id: '#10234', subject: 'Unable to log into account', category: 'Account', status: 'Open', date: '2025-05-10 14:32' },
    { id: '#10233', subject: 'Wrong item delivered', category: 'Purchase', status: 'Resolved', date: '2025-05-10 15:45' },
    { id: '#10232', subject: 'Bulk order discount inquiry', category: 'Sales', status: 'Closed', date: '2025-05-09 10:15' },
    { id: '#10231', subject: 'Add to Cart not working', category: 'Technical', status: 'Open', date: '2025-05-08 09:20' },
    { id: '#10230', subject: 'Unable to log into account', category: 'Account', status: 'In Progress', date: '2025-05-11 11:00' },
    { id: '#10229', subject: 'Wrong item delivered', category: 'Purchase', status: 'Resolved', date: '2025-05-09 10:15' },
    { id: '#10228', subject: 'Unable to log into account', category: 'Account', status: 'In Progress', date: '2025-05-10 15:45' },
    { id: '#10227', subject: 'Wrong item delivered', category: 'Purchase', status: 'Closed', date: '2025-05-09 10:15' },
    { id: '#10226', subject: 'Bulk order discount inquiry', category: 'Sales', status: 'Resolved', date: '2025-05-10 15:45' },
  ];

  const tickets = propTickets || defaultTickets;

  // Filter options
  const filterMenuOptions = {
    Date: [
      "Last 3 Days",
      "Last 7 Days",
      "Last 2 Weeks",
      "Last 1 Month",
      "Last 3 Months",
      "Last Year",
    ],
    Status: [
      "Open",
      "In Progress",
      "Resolved",
      "Closed",
    ],
    Category: [
      "Account",
      "Purchase",
      "Sales",
      "Technical",
    ],
  };

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeFilterMenu, setActiveFilterMenu] = useState(null);
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  const handleFilterToggle = (menuName) => {
    setActiveFilterMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleMenuClick = (action, ticket) => {
    console.log(`${action} clicked for ticket:`, ticket);
    setActiveDropdown(null); // Close dropdown after action
    
    if (action === "View Ticket") {
      // If a custom handler was provided, use it
      if (onViewTicket) {
        onViewTicket(ticket);
      } else {
        // Default behavior - navigate to ChatRoom
        navigate('/PCCSupport/ChatRoom');
      }
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown !== null) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-gray-100 text-gray-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-red-100 text-red-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Reusable components
  const TableHeader = ({ title }) => (
    <div className="bg-white p-4 flex items-center h-12">
      <div className="font-semibold text-sm text-gray-900">{title}</div>
    </div>
  );

  TableHeader.propTypes = {
    title: PropTypes.string.isRequired
  };

  const TableRow = ({ children }) => (
    <div className="p-4 flex items-center h-12 hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
      {children}
    </div>
  );

  TableRow.propTypes = {
    children: PropTypes.node.isRequired
  };

  const TableCell = ({ children }) => (
    <div className="flex items-center gap-1.5 text-gray-900 font-semibold text-xs">
      {children}
    </div>
  );

  TableCell.propTypes = {
    children: PropTypes.node.isRequired
  };

  const StatusBadge = ({ status, className }) => (
    <div className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(status)} ${className}`}>
      {status}
    </div>
  );

  StatusBadge.propTypes = {
    status: PropTypes.string.isRequired,
    className: PropTypes.string
  };

  const Breadcrumb = () => (
    <div className="flex items-center gap-2 text-sm">
      <div className="text-gray-500">Dashboard</div>
      <div className="w-4 h-4 flex items-center justify-center">
        <div className="p-0.75 flex flex-col gap-0 items-start justify-start">
          <div className="flex flex-row gap-0 items-start justify-start">
            <img className="w-3.5 h-3.5" src={icon0} alt="Icon" />
          </div>
        </div>
      </div>
      <div className="text-yellow-500 font-medium">{title}</div>
    </div>
  );

  const CreateTicketButton = ({ onClick }) => (
    <button 
      onClick={onClick}
      className="bg-[#FFD700] hover:bg-[#1D1D1D] text-gray-900 hover:text-[#FFD700] rounded-lg flex items-center justify-center w-full lg:w-[186px] h-11 cursor-pointer transition-colors duration-200 font-semibold text-lg max-[550px]:text-base gap-2"
    >
      <div className="relative overflow-hidden w-6 h-6">
        <img className="absolute w-5/6 h-5/6 right-1/12 left-1/12 bottom-1/12 top-1/12" src={group2} alt="Plus" />
      </div>
      Create Ticket
    </button>
  );

  CreateTicketButton.propTypes = {
    onClick: PropTypes.func.isRequired
  };

  const FilterDropdown = ({ label, iconSrc, width }) => (
    <div className="relative w-full sm:w-auto" style={{ minWidth: width === '100%' ? 'auto' : width }}>
      <button
        onClick={() => handleFilterToggle(label)}
        className="bg-white rounded-md border border-gray-300 p-2 flex items-center gap-1 justify-start hover:border-gray-400 transition-colors duration-200 cursor-pointer w-full sm:w-auto min-w-[120px]"
      >
        <img className="w-4 h-4" src={iconSrc} alt="Filter" />
        <div className="text-gray-600 font-semibold text-sm max-[550px]:text-xs flex-1 sm:w-20">{label}</div>
        <div className="relative w-3 h-3">
          <img className="absolute w-full h-full top-0 left-0 bottom-0 right-0" src={label === 'Date' ? group0 : (label === 'Status' ? group1 : group2)} alt="Down" />
        </div>
      </button>

      {activeFilterMenu === label && (
        <div className="absolute left-0 top-10 bg-white rounded shadow p-2 text-sm w-44 max-[550px]:w-full z-10 mt-1">
          {filterMenuOptions[label].map((item) => (
            <div
              key={item}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                console.log(`${label} selected:`, item);
                setActiveFilterMenu(null);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  FilterDropdown.propTypes = {
    label: PropTypes.string.isRequired,
    iconSrc: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
  };

  return (
    <div className="py-6 px-4 max-[550px]:p-4 flex flex-col gap-10 overflow-y-auto w-full bg-[#faf9f9] h-auto">
      <div className="flex flex-col gap-6 h-auto">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="text-left text-gray-800 font-bold text-xl w-full">{title}</div>
            <Breadcrumb />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 max-[550px]:p-3 flex flex-col gap-5 shadow-[0.96px_0.96px_9.62px_0px_rgba(0,0,0,0.05)] min-h-0">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between flex-wrap gap-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full lg:w-auto">
              <div className="text-gray-900 font-semibold text-base max-[550px]:text-sm">Sort by</div>
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full sm:w-auto">
                <FilterDropdown label="Date" iconSrc={miFilter0} width="100%" />
                <FilterDropdown label="Status" iconSrc={miFilter1} width="100%" />
              </div>
            </div>
            {showCreateTicketButton && (
              <div className="w-full lg:w-auto">
                <CreateTicketButton onClick={() => setIsModalOpen(true)} />
              </div>
            )}
          </div>

          <div className="bg-white rounded-md mt-6 mb-20">
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <table className="w-full border-separate border-spacing-y-2">
                  <thead className="bg-[#faf9f9]">
                    <tr className="text-left text-[@202020] h-10 text-sm max-[550px]:text-xs">
                      <th className="px-2 py-2" style={{whiteSpace: "nowrap"}}>Ticket ID</th>
                      <th className="px-2 py-2" style={{whiteSpace: "nowrap", maxWidth: "300px"}}>Subject</th>
                      <th className="px-2 py-2" style={{whiteSpace: "nowrap", maxWidth: "90px"}}>Category</th>
                      <th className="px-2 py-2" style={{whiteSpace: "nowrap"}}>Status</th>
                      <th className="px-2 py-2" style={{whiteSpace: "nowrap"}}>Date Created</th>
                      <th className="px-2 py-2" style={{whiteSpace: "nowrap"}}><span className="sr-only">Actions</span></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm max-[550px]:text-xs">
                    {filteredTickets.slice(indexOfFirstItem, indexOfLastItem).map((ticket, index) => (
                      <tr
                        key={indexOfFirstItem + index}
                        className="bg-white rounded"
                      >
                        <td className="px-2 py-2 whitespace-nowrap">#{ticket.id}</td>
                        <td className="px-2 py-2 whitespace-nowrap truncate" style={{maxWidth: "300px"}}>{ticket.subject}</td>
                        <td className="px-2 py-2 whitespace-nowrap truncate" style={{maxWidth: "90px"}}>{ticket.category}</td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <StatusBadge status={ticket.status} className="inline-block" />
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">{ticket.date}</td>
                        <td className="px-2 py-2 whitespace-nowrap text-right relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDropdownToggle(indexOfFirstItem + index);
                            }}
                            className="text-blue-600 text-sm max-[550px]:text-xs font-medium cursor-pointer"
                          >
                            View Ticket
                          </button>

                          {activeDropdown === indexOfFirstItem + index && (
                            <div className="absolute text-[10px] right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48 max-[550px]:w-40">
                              <div className="py-1">
                                <button
                                  onClick={() => handleMenuClick("View Ticket", ticket)}
                                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  </div>
                                  <span className="text-[10px] text-gray-700">View Ticket</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Simple pagination controls */}
              <div className="p-8 max-[550px]:p-4 flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTickets.length)} of {filteredTickets.length} results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Create Ticket Modal */}
      <CreateTicketModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={(ticketData) => {
          console.log('Submitting ticket:', ticketData);
          // Call the provided callback if available
          if (onTicketSubmit) {
            onTicketSubmit(ticketData);
          }
          
          // Here you would typically make an API call to submit the ticket
          // For now, we'll just add it to our tickets list
          const newTicket = {
            id: '#' + (filteredTickets.length > 0 ? (parseInt(filteredTickets[0].id.substring(1)) + 1) : 10235),
            subject: ticketData.subject,
            category: ticketData.category.charAt(0).toUpperCase() + ticketData.category.slice(1),
            status: 'Open',
            date: new Date().toISOString().slice(0, 16).replace('T', ' ')
          };
          
          setFilteredTickets([newTicket, ...filteredTickets]);
          setIsModalOpen(false);
        }} 
      />
    </div>
  );
};

Support.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })),
  onTicketSubmit: PropTypes.func,
  onViewTicket: PropTypes.func,
  title: PropTypes.string,
  showCreateTicketButton: PropTypes.bool,
};

export default Support;
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

interface SwitchBusinessProps {
    label: string;
}

const SwitchBusiness: React.FC<SwitchBusinessProps> = ({ label }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { businessAccounts, selectedBusinessAccount, setSelectedBusinessAccount } = useAppContext();

    return (
        <>
            {/* Card */}
            <div className="mb-4 flex items-center justify-between rounded-2xl bg-gray-50 p-4 shadow-sm">
                <p className="text-sm text-gray-600">
                    Showing {label} for{" "}
                    <span className="font-semibold text-gray-900">
                        {selectedBusinessAccount?.name ?? "No Business Selected"}
                    </span>
                </p>
                {/* <button
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-lg bg-[#FFD700] hover:bg-[#1D1D1D] text-black hover:text-[#FFD700] px-3 py-1 text-sm font-medium shadow transition-colors"
                >
                    Switch Business
                </button> */}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            Select a Business
                        </h2>
                        <ul className="space-y-3">
                            {businessAccounts.map((business) => {
                                const isActive = business.id === selectedBusinessAccount?.id;

                                return (
                                    <li
                                        key={business.id}
                                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${isActive
                                                ? "border-yellow-500 bg-yellow-50"
                                                : "border-gray-200 hover:bg-gray-100"
                                            }`}
                                        onClick={() => {
                                            setSelectedBusinessAccount(business);
                                            setIsModalOpen(false);
                                        }}
                                    >
                                        <img
                                            src={business.logo}
                                            alt={business.name}
                                            className={`h-10 w-10 rounded-full object-cover ${isActive ? "ring-2 ring-yellow-500" : ""}`}
                                        />
                                        <div>
                                            <p
                                                className={`font-medium ${isActive ? "text-yellow-700" : "text-gray-900"}`}
                                            >
                                                {business.name}
                                            </p>
                                            <p className="text-xs text-gray-500">{business.storeName}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SwitchBusiness;

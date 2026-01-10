
interface NoTableDataProps { 
    message?: string; 
    colspan: number;
    isLoading: boolean;
    data: any[];
}
const NoTableData = ({ message, colspan, isLoading, data }: NoTableDataProps) => {

    if(!isLoading && data.length === 0) {
        return (
            <tr>
                <td colSpan={colspan} className="text-center">{message  || 'No data available'}</td>
            </tr>
        )
    }

    return <></>;
}

export default NoTableData;
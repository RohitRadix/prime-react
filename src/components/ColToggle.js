
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import axios from 'axios';

const ColToggle = () => {
    const columns = [
        { field: 'id', header: 'Id' },
        { field: 'name', header: 'Name' },
        { field: 'mobile', header: 'Mobile' },
        { field: 'id_proofe_type', header: 'Id_proofe_type' }
    ];

    const [selectedColumns, setSelectedColumns] = useState(columns);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        axios.get('http://healthcamp.radixforce.com/api/tonyusers/all').then((response)=>{
            let data = response.data.result;
            setProducts(data).catch((error)=>{
                console.log(error);
            })
        })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onColumnToggle = (event) => {
        let selectedColumns = event.value;
        let orderedSelectedColumns = columns.filter(col => selectedColumns.some(sCol => sCol.field === col.field));
        setSelectedColumns(orderedSelectedColumns);
    }

    const header = (
        <div style={{ textAlign: 'left' }}>
            <MultiSelect value={selectedColumns} options={columns} optionLabel="header" onChange={onColumnToggle} style={{ width: '20em' }} />
        </div>
    );

    const columnComponents = selectedColumns.map(col => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    return (
        <div>
            <div className="card">
                <DataTable value={products} header={header} responsiveLayout="scroll">
                    {columnComponents}
                </DataTable>
            </div>
        </div>
    );
}
export default ColToggle

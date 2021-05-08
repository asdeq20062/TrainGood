import React, { useState } from 'react';
import PtCard from '../../component/PtCard';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles(theme=>({
    root: {
        position: 'relative',
        top: '56px',
        backgroundColor: 'silver',
        minHeight: '100vh'
    },
    pageRoot: {
        position: 'relative',
        top: '56px',
        backgroundColor: 'silver'
    }
  }));

export default function showpt({data, totalpages, currentpage}) {
    const classes = useStyles();
    const [curPage, setCurPage] = useState(currentpage);

    const handleChangePage = (e, value) => {
        setCurPage(value);
    }

    return (
        <>

            <Grid 
                className = {classes.root}
                container
                direction="row"
            >
                {
                    data.map(pt =>
                        {
                            return <Grid item xs align="center"><PtCard ptdata = {pt}/></Grid>
                        }
                    )
                }
            </Grid>
            <Grid 
                container
                direction="row"
                className = {classes.pageRoot}
                justify="center"
            >
                <Pagination 
                    hideNextButton={true}
                    hidePrevButton={true}
                    count={Number(totalpages)} 
                    onChange={handleChangePage} 
                    page={Number(curPage)}
                    renderItem={
                        (item) => (
                            <PaginationItem
                                component={Link}
                                href={`/showpt/${item.page}`}
                                {...item}
                            />
                        )
                    }
                />
            </Grid>
        </>
    )
  }

export async function getServerSideProps({params}){
// fetch total of personal trainers
    const count = await fetch(process.env.API_HOST + 'countallpt',
        {method: 'GET'}
    );
    const totalpt = await count.json();
    const totalpages = Math.ceil(totalpt.count/totalpt.item_count);

    // fetch personal trainers
    const res = await fetch(process.env.API_HOST + 'showallpt/' + params.page,
        {method: 'GET'}
    );
    const data = await res.json();
    return { 
        props: {
            data: data,
            totalpages: totalpages,
            currentpage: params.page
        }
    }
}
import React, { useState } from 'react';
import PtCard from '../../component/PtPage/PtCard';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Link from '@material-ui/core/Link';
import { getCorrectApiHost } from '../../helper/helper';


const useStyles = makeStyles(theme=>({
    root: {
        marginTop: '56px',
        backgroundColor: 'silver'
    },
    pageRoot: {
        backgroundColor: 'silver'
    },
    background: {
        backgroundColor: 'silver',
        minHeight: '100vh'
    }
  }));

export default function showpt({data, totalpages, currentpage}) {
    const classes = useStyles();
    const [curPage, setCurPage] = useState(currentpage);

    const handleChangePage = (e, value) => {
        setCurPage(value);
    }

    return (
        <div className = {classes.background}>

            <Grid 
                className = {classes.root}
                container
                direction="row"
            >
                {
                    data.map(pt =>
                        {
                            return <Grid key={pt.id} item xs align="center"><PtCard ptdata = {pt}/></Grid>
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
        </div>
    )
  }

export async function getServerSideProps({params}){
    // fetch total of personal trainers
    const count = await fetch(getCorrectApiHost() + 'countallpt',
        {method: 'GET'}
    );
    const totalpt = await count.json();
    const totalpages = Math.ceil(totalpt.count/totalpt.item_count);

    // fetch personal trainers
    const res = await fetch(getCorrectApiHost() + 'showallpt/' + params.page,
        {method: 'GET'}
    );
    const data = await res.json();
    return { 
        props: {
            /*
                @param {int} data.id
                @param {string} data.phone_num
                @param {string} data.email
                @param {string} data.frist_name
                @param {string} data.last_name
                @param {int} data.pt_exp
                @param {string} data.icon_url
                @param {float} data.rating
            */
            data: data,
            totalpages: totalpages,
            currentpage: params.page
        }
    }
}
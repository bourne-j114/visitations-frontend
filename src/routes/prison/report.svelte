<script context="module">
    export async function preload({params}, {user}) {
        if (user) {
            this.redirect(302, `/`);
        }
    }
</script>

<script>
    import { stores} from '@sapper/app';
    import * as api from 'api.js';

    const {session} = stores();
    let prison = {
        prison_id: "",
        gender: "m",
        first_name: "",
        last_name: "",
        nick_name: "",
        birth_day: "",
        prison_type: 1,
        remark: "",
        id_card: "",
        address_no: "",
        moo: "",
        subdistric: "",
        distric: "",
        province: "",
        nation: "",
        race: "",
        nationality: "",
        religion: "",
        blame: "",
        education: "",
        edu_institution: "",
        status: "",
        child: 0,
        sibling: 0,
        child_in_a_child: 0,
        home_owner: "",
        stay_address_no: "",
        stay_moo: "",
        stay_subdistric: "",
        stay_distric: "",
        stay_province: "",
        occupation: "",
        income: "",
        history_punish: "",
        history_punish_year: "",
        history_punish_month: "",
        history_punish_day: "",
        prove_pass_num: "",
        cur_num: ""
    };
   let case_detail = {
        prison_id: "",
        court_order: "",
        case_no: "",
        case_detail: "",
        police_station: "",
        catch_date: "",
        receive_date: "",
    };
    let prison_id = "5631200038";
    let errors;
    let options = [];
    let selectedOption;

    $: getPrisonInfo();

    async function getPrisonInfo() {
      //  prison_id = prison.prison_id;
        prison = null;
        let query = `prisons/getinfo/${prison_id}`;
        ({case_detail,prison} = await api.get(query, $session.user && $session.user.token));
    }
</script>

<svelte:head>
    <title>รายงาน</title>
</svelte:head>

<style type="text/css">
    * {
        margin: 0;
        padding: 0;
    }

    body {
        background: white;
    }
    .resumeCanvas {
        margin: 0 auto;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0.3in;
        width: 8.5in;
        height: 12in;
        background-color: #faffff;
        -webkit-box-shadow: 0 3px 8px -3px rgba(0, 0, 0, 0.7);
        box-shadow: 0 3px 8px -3px rgba(0, 0, 0, 0.7);
    }

    .gridParent {
        width: 100%;
        height: 100%;
        display: -ms-grid;
        display: grid;
        -ms-grid-columns: (1fr)[6] 255px;
        grid-template-columns: repeat(4, 1fr) 255px;
        -ms-grid-rows: (1fr)[6];
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }

    .titleHeader {
        -ms-grid-row: 1;
        -ms-grid-row-span: 1;
        -ms-grid-column: 1;
        -ms-grid-column-span: 5;
        grid-area: 1 / 1 / 2 / 6;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin-bottom: 27px;
    }

    .titleHeader h3 {
        font-family: "Quicksand", sans-serif;
        text-align: right;
        padding-right: 60px;
    }

    .leftSummary {
        -ms-grid-row: 1;
        -ms-grid-row-span: 1;
        -ms-grid-column: 1;
        -ms-grid-column-span: 4;
        grid-area: 1 / 1 / 5 / 6;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        justify-content: space-evenly;
        font-size: 16px;
        font-family: "Quicksand", sans-serif;
    }


    .leftSummary h5 {
        font-style: italic;
    }

    .leftSummary p {
        font-size: 16px;
        margin: 1px;
    }
    .row {
        display: flex;
        flex-wrap: wrap;
    }

    .img {
        width: 150px;
        height: 150px;
    }
    .details-container {
        flex: 2;
    }

    .avatar-container {
        flex: 1;
    }

</style>
{#if  prison}
    <main class="resumeCanvas">
        <div class="gridParent">
            <div class="titleHeader">
                <div class="row">
                    <div class="avatar-container">
                        <div class="photo">
                            <img class="img" src="https://picsum.photos/200" />
                        </div>
                    </div>
                    <div class="details-container">
                        <div class="content">
                            <h5>แบบสอบประวัติและการจัดทำทะเบียนผู้เข้าการตรวจพิสูจน์</h5>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
            <div class="leftSummary">
                <div >
                    <p>สถานที่ควบคุมตัว สถานที่เพื่อการตรวจพิสูจน์จังหวัดสระแก้ว</p>
                    <p>
                        ถูกจับเมื่อวันที่:  {case_detail.catch_date} รับตัวเมื่อวันที่: {case_detail.receive_date}
                    </p>
                    <p>
                        หมายเลขคดี:{case_detail.case_no} คำสั่งศาล:{case_detail.court_order}
                    </p>
                    <p>
                        สน.ท้องที่: {case_detail.police_station}
                    </p>
                    <p>
                        พฤติการณ์และสาเหตุการกระทำผิด: {case_detail.case_detail}
                    </p>
                    <p>
                       เหตุที่ได้พ้นจำคุก
                    </p>

                    <br>
                    <h5>ประวัติทางสังคมของผู้เข้ารับการตรวจพิสูจน์</h5>
                    <p>
                      ชื่อ: <strong>{prison.first_name}</strong>  นามสกุล:  <strong>{prison.last_name}</strong>  ชื่อเล่น: <strong>{prison.nick_name}</strong>
                    </p>
                    <p>เพศ: <strong>{#if prison.gender === "m"} ชาย {:else} หญิง{/if}</strong> เลขบัตรประชาชน: {prison.id_card} </p>
                    <p>เชื้อชาติ: {prison.race} สัญชาติ: {prison.nationality}  ศาสนา: {prison.religion}</p>
                    <p>ตำหนิ: {prison.blame}</p>
                    <p>วัน เดือน ปี เกิด: {prison.birth_day} อายุ: - </p>
                    <p>
                        บ้านเลขที่: {prison.address_no}  หมู่ที่: {prison.moo}  ตำบล: {prison.subdistric} อำเภอ: {prison.distric} จังหวัด: {prison.province}
                    </p>
                    <p>บ้านเลขที่: {prison.stay_address_no}   หมู่ที่: {prison.stay_moo} ตำบล: {prison.stay_subdistric}  อำเภอ:{prison.stay_distric}   จังหวัด: {prison.stay_province}
                    </p>
                    <p>
                        สถานภาพ: {prison.status} จำนวนบุตร: {prison.child}
                    </p>
                    <p>
                        มีพี่น้องร่วม: {prison.sibling} คน  เป็นบุตรคนที่: {prison.child_in_a_child}  พักอาศัยบ้านของ: {prison.home_owner}
                    </p>
                    <p>
                        ประวัติการต้องโทษ: {prison.history_punish} ปี {prison.history_punish_month}  เดือน {prison.history_punish_day} วัน
                    </p>
                   <p>
                        อาชีพ: {prison.occupation} รายได้: {prison.income} บาท
                    </p>
                    <p>
                        ระดับการศึกษา: {prison.education} ชื่อที่อยู่สถานศึกษา: {prison.edu_institution}
                    </p>
                    <p>
                        จำนวนครั้งที่ผ่านการตรวจพิสูจน์ในสถานที่เพื่อการควบคุมตัวฯ:  {prison.prove_pass_num} ครั้ง   เคยผ่านการบำบัด: {prison.cur_num} ครั้ง
                    </p>
                </div>
            </div>

        </div>
    </main>
{/if}
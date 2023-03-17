<div>
    Below is a list of all students who have signed up for this feature. We've 
    also included a preliminary scoring of their abilities using our new AI-based
    rating system.
</div>
<div class="career-block">
    {{{each allData}}}
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <div class="card-title">
                    {../name}
                    <a href="mailto: {../email}" class="email">
                        <i class="fa fa-envelope"></i>
                    </a>
                </div>
                <div class="card-text">
                    Age: {../age}
                    Gender: {../gender}
                </div>
                <div class="prediction" style={function.getPredictionColor, ../prediction}>
                    {function.formatPrediction, ../prediction}
                </div>
            </div>
        </div>
    {{{end}}}    
</div>

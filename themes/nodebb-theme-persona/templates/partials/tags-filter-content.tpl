<div class="btn-group pull-right bottom-sheet <!-- IF !filters.length -->hidden<!-- ENDIF !filters.length -->">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
        <span class="visible-sm-inline visible-md-inline visible-lg-inline">{tags.value}</span><span class="visible-xs-inline"><i class="fa fa-fw {tags.value}"></i></span> <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" role="menu">
        {{{each topics}}}
            {{{each topics.tags}}}
            <li role="presentation" class="category">
                <a role="menu-item" href="{config.relative_path}/{topics.tags.url}"><i class="fa fa-fw <!-- IF topics.tags.selected -->fa-check<!-- ENDIF topics.tags.selected -->"></i>{topics.tags.value}</a>
            </li>
            {{{end}}}
        {{{end}}}
    </ul>
</div>
